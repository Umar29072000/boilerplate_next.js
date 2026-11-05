# Project Idea: Production-Grade Next.js Boilerplate

## 1. Executive Summary & Vision
Membangun fondasi (boilerplate) Next.js (App Router) yang *production-ready*, modular, dan *scalable* untuk mempercepat pengembangan aplikasi web/SaaS dan dashboard operasional.
- **Tujuan Utama:** Menghilangkan waktu setup berulang (autentikasi, HTTP client/interceptors, manajemen state, komponen dasar, dan Docker deployment).
- **Filosofi Desain:** *High-signal, low-noise* (terinspirasi dari Linear, Vercel, dan Stripe). Menggunakan pendekatan *border-first*, tipografi tajam, responsif, dan bebas dari tampilan generik ala template AI (*Zero AI Slop*).
- **Fleksibilitas Arsitektur:** Siap digunakan sebagai *standalone client* yang berkomunikasi dengan backend eksternal (misal: Golang REST API/gRPC/SSE) maupun sebagai *fullstack app* via Route Handlers.

---

## 2. Tech Stack & Ecosystem
- **Core Framework:** Next.js (App Router, React Server Components & Client Components dengan pemisahan yang tegas, konfigurasi `next.config.ts`).
- **Language:** TypeScript (Strict mode enabled, zero `any` policy).
- **Styling & UI Primitives:** 
  - Tailwind CSS
  - `shadcn/ui` (Radix UI primitives) dengan palet monokromatik (`zinc`/`slate`).
  - Lucide Icons (ukuran konsisten `w-4 h-4` atau `w-5 h-5` untuk UI padat).
- **State Management & Data Fetching:**
  - **Server State:** TanStack Query (React Query v5) untuk caching, *optimistic updates*, dan sinkronisasi data API.
  - **Client State:** Zustand untuk state global yang ringan (`auth-store.ts`, UI preferences).
- **Forms & Validation:** React Hook Form + Zod (digunakan untuk validasi form di `validations/` dan validasi *Environment Variables* di `src/lib/env.ts`).
- **Networking / API Client:** Axios instance terpusat (`src/lib/api-client.ts`) yang mendukung *automatic token refresh*, *request/response interceptors*, dan *standardized error parsing*.

---

## 3. UI/UX & Code Craftsmanship Guardrails (Anti-AI Slop)
1. **Color Palette:** Dominasi warna netral tajam (`zinc-950` untuk dark mode background, `zinc-900` untuk surface/card, `zinc-50` untuk light mode). Satu warna aksen fungsional untuk *primary actions*. DILARANG menggunakan gradasi ungu/biru/pink neon.
2. **Borders over Shadows:** Gunakan `border border-zinc-200 dark:border-zinc-800` dan `shadow-sm` untuk memisahkan kontainer. Hindari penggunaan `shadow-xl` atau *glassmorphism* berlebihan.
3. **Typography & Data Density:**
   - Gunakan `text-sm` (14px) sebagai standar teks komponen operasional, tabel, dan form.
   - Wajib menggunakan `font-mono tabular-nums` untuk semua data numerik, harga/nominal, ID transaksi, dan timer.
   - Optimalkan pemuatan font lokal/Google Fonts melalui `next/font` di `app/layout.tsx`.
4. **Complete UI States:** Setiap halaman dan komponen yang melakukan *data fetching* wajib menangani *Loading state* (skeleton proporsional), *Empty state*, dan *Error state* dengan rapi.
5. **Zero AI Code Smell:** Dilarang menulis komentar JSX/TS klise yang menjelaskan hal sepele (seperti `{/* Header Section */}` atau `// Initialize state`). Biarkan struktur komponen dan penamaan variabel yang bersih berbicara sendiri.

---

## 4. Directory Structure (Feature-Sliced & Zero Redundancy)
Seluruh *business logic* dan pemanggilan API terisolasi di dalam `src/features/`, sementara `src/lib/` hanya menyimpan *core instances* dan konfigurasi teknis.

```text
my-next-app/
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── forbidden.tsx
│   │
│   ├── components/
│   │   ├── ui/                  # Primitives (button, input, modal, dropdown, table)
│   │   ├── common/              # Layout & shared (header, sidebar, footer, empty-state)
│   │   └── providers/
│   │       └── app-provider.tsx # Gabungan QueryClientProvider, ThemeProvider, Toaster
│   │
│   ├── features/                # Semua logic bisnis & API call terisolasi per domain
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/        # Contoh: auth.service.ts (memanggil lib/api-client)
│   │   │   ├── types/
│   │   │   └── validations/     # Skema Zod khusus form/payload auth
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types/
│   │
│   ├── hooks/                   # Global UI hooks
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/                     # Core utilities & instances
│   │   ├── api-client.ts        # Axios instance + request/response interceptors
│   │   ├── query-client.ts      # Konfigurasi TanStack Query
│   │   ├── utils.ts             # cn() tailwind-merge, formatter tanggal/mata uang
│   │   ├── constants.ts
│   │   └── env.ts               # Validasi Zod environment variables (di-import di next.config.ts)
│   │
│   ├── stores/                  # Global client state (Zustand)
│   │   └── auth-store.ts
│   │
│   ├── types/                   # Global TypeScript contracts
│   │   ├── api.ts               # ApiResponse<T>, PaginatedResponse<T>, ApiError
│   │   └── global.ts
│   │
│   ├── config/
│   │   ├── site.ts              # Metadata situs, nama aplikasi, URL
│   │   └── navigation.ts        # Konfigurasi menu sidebar & breadcrumbs
│   │
│   └── middleware.ts            # Route protection & RBAC
│
├── .dockerignore
├── .env.example
├── .env.local
├── .gitignore
├── components.json
├── Dockerfile
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
