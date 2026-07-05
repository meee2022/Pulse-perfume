"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import {
  listProductsRef,
  seedProductsRef,
  adminUpdateProductRef,
  listOrdersRef,
  updateOrderStatusRef,
  generateUploadUrlRef,
  getSettingsRef,
  updateSettingsRef,
} from "@/lib/convex";
import { seedPayload } from "@/lib/useProducts";

const money = (n: number) => `QAR ${n.toLocaleString("en")}`;
const STATUSES = ["new", "preparing", "shipped", "delivered"];

// upload a file to Convex storage, return its storageId
async function uploadFile(
  genUrl: (args: { adminKey: string }) => Promise<string>,
  adminKey: string,
  file: File
): Promise<string> {
  const url = await genUrl({ adminKey });
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": file.type }, body: file });
  const json = await res.json();
  return json.storageId as string;
}

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    const k = localStorage.getItem("pulse-admin-key");
    if (k) setKey(k);
  }, []);

  if (!key) {
    return (
      <div className="grid min-h-[80svh] place-items-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            localStorage.setItem("pulse-admin-key", input.trim());
            setKey(input.trim());
          }}
          className="w-full max-w-sm text-center"
        >
          <p className="label mb-3">PULSE Admin</p>
          <h1 className="font-display text-3xl uppercase tracking-wide2 text-ink">تسجيل الدخول</h1>
          <p className="mt-3 text-sm text-olive-deep">اكتب مفتاح الأدمن (ADMIN_KEY) للدخول للوحة التحكم.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ADMIN_KEY"
            className="mt-6 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-center text-sm outline-none focus:border-olive"
          />
          <button type="submit" className="btn-solid mt-4 w-full">
            دخول
          </button>
        </form>
      </div>
    );
  }

  return <Dashboard adminKey={key} onLogout={() => { localStorage.removeItem("pulse-admin-key"); setKey(null); }} />;
}

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const products = useQuery(listProductsRef, {}) as any[] | undefined;
  const orders = useQuery(listOrdersRef, { adminKey }) as any[] | undefined;
  const seed = useMutation(seedProductsRef);
  const [tab, setTab] = useState<"products" | "orders" | "hero">("products");
  const [seeding, setSeeding] = useState(false);

  return (
    <div className="mx-auto max-w-shell px-6 py-12 md:px-10">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <p className="label">PULSE</p>
          <h1 className="font-display text-2xl uppercase tracking-wide2 text-ink">لوحة التحكم</h1>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" className="btn-line !px-5 !py-2.5 text-xs">الموقع</a>
          <button onClick={onLogout} className="btn-line !px-5 !py-2.5 text-xs">خروج</button>
        </div>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {(["products", "hero", "orders"] as const).map((tKey) => (
          <button
            key={tKey}
            onClick={() => setTab(tKey)}
            className={`rounded-full px-5 py-2 font-display text-xs uppercase tracking-wide2 transition-colors ${
              tab === tKey ? "bg-ink text-paper-1" : "bg-paper-2 text-olive-deep"
            }`}
          >
            {tKey === "products" ? "المنتجات والأسعار" : tKey === "hero" ? "الهيرو" : `الطلبات${orders ? ` (${orders.length})` : ""}`}
          </button>
        ))}
      </div>

      {tab === "hero" && <HeroSettings adminKey={adminKey} />}

      {tab === "products" && (
        <section>
          {products === undefined ? (
            <p className="text-sm text-olive-deep">جارٍ التحميل…</p>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-paper-1 p-8 text-center">
              <p className="text-sm text-olive-deep">مفيش منتجات في Convex لسه. اضغط لتحميل المنتجات الحالية:</p>
              <button
                disabled={seeding}
                onClick={async () => {
                  setSeeding(true);
                  try {
                    await seed({ adminKey, products: seedPayload });
                  } catch (e) {
                    alert("فشل — تأكد إنك نشرت دوال Convex وضبطت ADMIN_KEY");
                  }
                  setSeeding(false);
                }}
                className="btn-solid mt-5"
              >
                {seeding ? "جارٍ…" : "تحميل المنتجات (Seed)"}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.sort((a, b) => a.order - b.order).map((p) => (
                <ProductRow key={p._id} p={p} adminKey={adminKey} />
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "orders" && (
        <section>
          {orders === undefined ? (
            <p className="text-sm text-olive-deep">جارٍ التحميل…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-olive-deep">مفيش طلبات لسه (أو المفتاح غلط).</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <OrderRow key={o._id} o={o} adminKey={adminKey} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ProductRow({ p, adminKey }: { p: any; adminKey: string }) {
  const update = useMutation(adminUpdateProductRef);
  const genUrl = useMutation(generateUploadUrlRef);
  const [name, setName] = useState(p.name);
  const [price, setPrice] = useState(String(p.price));
  const [active, setActive] = useState(p.active);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dirty = name !== p.name || Number(price) !== p.price || active !== p.active;

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageId = await uploadFile(genUrl as any, adminKey, file);
      await update({ adminKey, id: p._id, patch: { cardStorageId: storageId } });
    } catch {
      alert("فشل رفع الصورة — تأكد إن Convex منشور و ADMIN_KEY مظبوط");
    }
    setUploading(false);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-ink/10 bg-paper-1 p-4">
      <label className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-paper-3" title="غيّر الصورة">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.card} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 grid place-items-center bg-ink/40 text-[9px] text-paper-1 opacity-0 transition-opacity hover:opacity-100">
          {uploading ? "…" : "تغيير"}
        </span>
        <input type="file" accept="image/*" onChange={onImage} className="hidden" />
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-[140px] flex-1 rounded-lg border border-ink/15 bg-white px-3 py-2 font-display text-sm uppercase tracking-wide2 outline-none focus:border-olive"
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-olive-deep">QAR</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-olive-deep">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        ظاهر
      </label>
      <button
        disabled={!dirty}
        onClick={async () => {
          await update({ adminKey, id: p._id, patch: { name, price: Number(price), active } });
          setSaved(true);
          setTimeout(() => setSaved(false), 1500);
        }}
        className={`btn-solid !px-5 !py-2.5 text-xs ${!dirty ? "opacity-40" : ""}`}
      >
        {saved ? "✓ اتحفظ" : "حفظ"}
      </button>
    </div>
  );
}

function OrderRow({ o, adminKey }: { o: any; adminKey: string }) {
  const update = useMutation(updateOrderStatusRef);
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper-1 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm uppercase tracking-wide2 text-ink">{o.customer.name}</p>
          <p className="text-xs text-olive-deep">
            {o.customer.phone} · {o.customer.city} · {o.customer.address}
          </p>
          <p className="text-xs text-olive-deep">{o.customer.email}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg tracking-wide2 text-ink">{money(o.total)}</p>
          <select
            value={o.status}
            onChange={(e) => update({ adminKey, id: o._id, status: e.target.value })}
            className="mt-1 rounded-lg border border-ink/15 bg-white px-2 py-1 text-xs outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 border-t border-ink/10 pt-3 text-xs text-olive-deep">
        {o.items.map((it: any, i: number) => (
          <span key={i} className="mr-3 inline-block">
            {it.name} × {it.qty} — {money(it.price * it.qty)}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSettings({ adminKey }: { adminKey: string }) {
  const settings = useQuery(getSettingsRef, {}) as any;
  const update = useMutation(updateSettingsRef);
  const genUrl = useMutation(generateUploadUrlRef);
  const [eyebrow, setEyebrow] = useState("");
  const [tagline, setTagline] = useState("");
  const [sub, setSub] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState("");

  useEffect(() => {
    if (settings && !loaded) {
      setEyebrow(settings.heroEyebrow ?? "");
      setTagline(settings.heroTagline ?? "");
      setSub(settings.heroSub ?? "");
      setLoaded(true);
    }
  }, [settings, loaded]);

  async function saveText() {
    await update({ adminKey, patch: { heroEyebrow: eyebrow, heroTagline: tagline, heroSub: sub } });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function uploadMedia(file: File, field: "heroVideoStorageId" | "heroPosterStorageId") {
    setBusy(field);
    try {
      const storageId = await uploadFile(genUrl as any, adminKey, file);
      await update({ adminKey, patch: { [field]: storageId } });
    } catch {
      alert("فشل الرفع — تأكد إن Convex منشور و ADMIN_KEY مظبوط");
    }
    setBusy("");
  }

  return (
    <section className="max-w-2xl space-y-6">
      <div className="rounded-2xl border border-ink/10 bg-paper-1 p-5">
        <p className="label mb-4">نصوص الهيرو</p>
        <div className="space-y-3">
          <Field label="السطر الصغير (Eyebrow)" value={eyebrow} onChange={setEyebrow} />
          <Field label="العنوان الكبير (Tagline)" value={tagline} onChange={setTagline} />
          <Field label="الوصف (Subtitle)" value={sub} onChange={setSub} />
        </div>
        <button onClick={saveText} className="btn-solid mt-5">
          {saved ? "✓ اتحفظ" : "حفظ النصوص"}
        </button>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper-1 p-5">
        <p className="label mb-4">وسائط الهيرو</p>
        <div className="flex flex-wrap gap-6">
          <MediaUpload
            label="فيديو الهيرو (mp4)"
            accept="video/mp4"
            busy={busy === "heroVideoStorageId"}
            current={settings?.heroVideo}
            onFile={(f) => uploadMedia(f, "heroVideoStorageId")}
            isVideo
          />
          <MediaUpload
            label="صورة الغلاف (Poster)"
            accept="image/*"
            busy={busy === "heroPosterStorageId"}
            current={settings?.heroPoster}
            onFile={(f) => uploadMedia(f, "heroPosterStorageId")}
          />
        </div>
        <p className="mt-4 text-xs text-olive-deep">لو سيبت أي حاجة فاضية بيرجع للقيمة الافتراضية في الموقع.</p>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-wide2 text-olive-deep">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-olive"
      />
    </label>
  );
}

function MediaUpload({
  label,
  accept,
  busy,
  current,
  onFile,
  isVideo,
}: {
  label: string;
  accept: string;
  busy: boolean;
  current?: string | null;
  onFile: (f: File) => void;
  isVideo?: boolean;
}) {
  return (
    <div>
      <span className="mb-2 block text-[11px] uppercase tracking-wide2 text-olive-deep">{label}</span>
      <div className="h-28 w-48 overflow-hidden rounded-lg border border-ink/10 bg-paper-3">
        {current ? (
          isVideo ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={current} className="h-full w-full object-cover" muted autoPlay loop playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current} alt="" className="h-full w-full object-cover" />
          )
        ) : (
          <div className="grid h-full place-items-center text-[10px] text-olive-deep">الافتراضي</div>
        )}
      </div>
      <label className="btn-line mt-2 inline-flex cursor-pointer !px-4 !py-2 text-[11px]">
        {busy ? "جارٍ الرفع…" : "رفع"}
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </label>
    </div>
  );
}
