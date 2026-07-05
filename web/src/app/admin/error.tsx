"use client";

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid min-h-[70svh] place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="label mb-3">Admin</p>
        <h1 className="font-display text-2xl uppercase tracking-wide2 text-ink">Convex غير متّصل</h1>
        <p className="mt-3 text-sm leading-relaxed text-olive-deep">
          لوحة التحكم محتاجة نشر دوال Convex أول مرة. شغّل <code className="rounded bg-paper-3 px-1">npx convex dev</code> في
          مجلد <code className="rounded bg-paper-3 px-1">web</code>، واضبط <code className="rounded bg-paper-3 px-1">ADMIN_KEY</code>،
          وبعدها افتح الصفحة تاني.
        </p>
        <button onClick={reset} className="btn-solid mt-6">
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
