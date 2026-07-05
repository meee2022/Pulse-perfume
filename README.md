# PULSE Perfume — Web + Mobile

منصّة **PULSE** الكاملة: موقع ويب فخم (Next.js) + تطبيق موبايل (Expo / React Native)، بنفس الهوية والمحتوى، مع **متجر + سلة + دفع + إشعارات + عمل أوفلاين (PWA)**.

> الشعار: **"Move With It." — A scent that moves with you.**
> اللون الرسمي: زيتوني `#7E836E` · ألوان العبوات: Dusty Green `#AEB39D` · Dusty Blue `#93A6B8` · Dusty Grey `#C2C4C7`.

---

## 📁 هيكل المشروع

```
pulse/
├── web/        ← موقع الويب (Next.js 14 · App Router · Tailwind · TypeScript)
├── mobile/     ← تطبيق الموبايل (Expo SDK 57 · Expo Router · TypeScript)
├── shared/     ← الأصول الأصلية (صور العبوات والبوكسات والهوية)
└── README.md   ← الملف ده
```

كل تطبيق مستقل بالكامل وليه `package.json` خاص بيه، بس بيشتركوا في نفس بيانات المنتجات ونفس الهوية.

---

## 🌐 تطبيق الويب (web)

### المميزات
- **Hero سينمائي** بصورة المجموعة + تاجلاين "Move With It." مع parallax عند التمرير.
- **قسم "فك التغليف" (Unboxing)** — العبوة بتطلع من البوكس بالتمرير (نفس الحركة اللي في الموقع الأصلي)، منفّذة بـ scroll-pinned animation.
- **المتجر (Three Scents):** الـ3 عطور بأسعارها ونوتاتها + اختيار الحجم (100ML / 3ML Tester) + Add to Cart.
- **سلة تفاعلية** (Drawer) + **شاشة دفع** (اسم / إيميل / تليفون / عنوان) + تأكيد الطلب "Order Placed!".
- **دفع أونلاين** عبر Stripe (اختياري) — ومن غير مفاتيح بيشتغل "وضع تجريبي" يسجّل الطلب محليًا.
- **PWA:** يتثبّت كتطبيق + يشتغل أوفلاين (service worker) + أيقونة ومانيفست.
- **SEO** كامل (Open Graph, metadata, sitemap-ready).

### التشغيل
```bash
cd web
npm install
npm run dev          # http://localhost:3000
```
للإنتاج:
```bash
npm run build
npm start
```

### تفعيل الدفع (Stripe)
انسخ `.env.example` لـ `.env.local` وحط مفاتيحك:
```
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_ENABLED=true
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
- من غير المفاتيح → الموقع يشتغل عادي بوضع تجريبي (الطلب يتسجّل محليًا).
- مع المفاتيح → زرار الدفع يوجّه لصفحة Stripe Checkout الآمنة.
- 🇪🇬🇶🇦 لو عايز بوابة محلية (مثل **Paymob** لمصر أو **MyFatoorah** للخليج): استبدل استدعاء Stripe في [`src/app/api/checkout/route.ts`](web/src/app/api/checkout/route.ts) بالـ API بتاعهم — نفس الفكرة بالظبط (بنبعت الطلب → بيرجّع رابط دفع → بنوجّه المستخدم عليه).

### النشر (Deploy)
أسهل طريقة **Vercel**:
```bash
npm i -g vercel
cd web && vercel
```
وحط متغيرات البيئة (Stripe + SITE_URL) في إعدادات المشروع على Vercel.

---

## 📱 تطبيق الموبايل (mobile)

Expo (يطلّع **Android + iOS** من نفس الكود) بنفس الهوية والشاشات.

### الشاشات
- **الرئيسية:** Hero + مزايا + العطور المميزة (سلايدر أفقي) + قسم Concrete Calm.
- **المتجر:** كل العطور.
- **صفحة المنتج:** صورة كبيرة + نوتات + بار Add to Cart ثابت.
- **السلة والدفع:** تعديل الكميات → بيانات التوصيل → تأكيد الطلب.
- **الإشعارات:** إشعار محلي بيتبعت أول ما الطلب يتأكّد (expo-notifications).

### التشغيل
```bash
cd mobile
npm install
npx expo start
```
بعدها:
- امسح الـ QR بتطبيق **Expo Go** على تليفونك، أو
- اضغط `a` لمحاكي أندرويد / `i` لمحاكي iOS / `w` للويب.

### بناء نسخة للمتاجر (App Store / Google Play)
عبر **EAS Build** (سحابي — مش محتاج ماك للـ iOS):
```bash
npm i -g eas-cli
eas login
eas build --platform android      # أو ios أو all
eas submit --platform android      # رفع للمتجر
```
> **ملاحظة عن الإشعارات:** بتشتغل على جهاز حقيقي (مش المحاكي). للإشعارات الفعلية من السيرفر (Push) هتحتاج تظبط FCM (أندرويد) / APNs (iOS) من داخل EAS — الكود جاهز مستنيها.

---

## 🎨 الأصول والهوية
- كل الصور الأصلية محفوظة في [`shared/`](shared/).
- تم قص كل عبوة/بوكس لوحده تلقائيًا ([`bottle-*.png`](web/public/images/) و[`box-*.png`](web/public/images/)) عشان حركة فك التغليف وكروت المنتجات.
- ملفات الهوية الكاملة (Brand Book / Brand Identity PDFs) موجودة في الفولدر الرئيسي للمشروع.

## ✅ الحالة
| العنصر | الحالة |
|---|---|
| بناء الويب (`next build`) | ✅ ناجح |
| فحص أنواع الموبايل (`tsc`) + تجميع (`expo export`) | ✅ ناجح |
| السلة + الدفع + تأكيد الطلب | ✅ متحقّق منه بصريًا |
| PWA / SEO / الإشعارات | ✅ مفعّلة |

## 🔜 خطوات مقترحة بعد كده
1. ربط بوابة دفع فعلية (Stripe live أو Paymob/MyFatoorah).
2. لوحة تحكم للطلبات (Supabase أو Firebase) بدل الطلب المحلي.
3. تسجيل دخول/حسابات (لو حبيت) — البنية جاهزة تستوعبها.
4. ربط دومين + رفع الويب على Vercel والتطبيق على المتاجر.
