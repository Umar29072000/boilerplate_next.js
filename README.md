  # Production-Grade Next.js App Router Boilerplate

Fondasi arsitektur frontend web/SaaS tingkat produksi berbasis **Next.js (App Router)** yang dirancang untuk kecepatan eksekusi, modularitas tinggi, dan kemudahan integrasi dengan backend eksternal (Golang REST API, gRPC, Node.js, atau FastAPI).

Dibangun dengan prinsip **Craftsmanship (Zero AI Slop)**: palet warna netral (`zinc`), pendekatan *border-first* 1px subtle, tipografi tajam, data numerik monospaced (`font-mono tabular-nums`), serta pemisahan *concern* yang tegas (*feature-sliced*).

---

## 1. Tech Stack & Ecosystem

- **Framework:** Next.js 15 (App Router, Server Components & Client Components terpisah tegas)
- **Language:** TypeScript 5.7 (Strict mode, zero `any` policy)
- **Styling & UI Primitives:**
  - Tailwind CSS + CSS Variables (`zinc` neutral base)
  - Radix UI Primitives (`@radix-ui/react-*`) via pola shadcn/ui
  - Lucide Icons (ukuran proporsional `w-4 h-4`)
  - Sonner (Notifikasi toast interaktif)
- **State Management & Data Fetching:**
  - **Server State:** TanStack Query v5 (React Query) dengan konfigurasi caching global, stale time 5 menit, dan smart error retry.
  - **Client State:** Zustand v5 dengan sinkronisasi `localStorage` dan HTTP Cookies (sehingga dapat dibaca oleh Next.js `middleware.ts`).
- **Networking & API Client:**
  - Axios instance terpusat (`src/lib/api-client.ts`) dengan *automatic silent token refresh* (queueing request yang tertunda), *request/response interceptors*, dan normalisasi error terstandarisasi.
- **Forms & Validations:**
  - React Hook Form + Zod (`@hookform/resolvers/zod`)
  - Validasi *Environment Variables* runtime via Zod di `src/lib/env.ts` (tervalidasi saat build).
- **Deployment:**
  - Docker multi-stage build memanfaatkan `output: "standalone"` Next.js untuk image berukuran minimal (~120MB) dan non-root security.

---

## 2. Struktur Direktori (Feature-Sliced)

```text
boilerplate-frontend/
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx          # Halaman Sign In terisolasi
│   │   │   └── register/page.tsx       # Halaman Register
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx      # Dashboard operasional utama
│   │   │   └── layout.tsx              # Layout dashboard (Sidebar + Header)
│   │   ├── api/
│   │   │   └── health/route.ts         # Endpoint healthcheck (JSON status)
│   │   ├── layout.tsx                  # Root layout (Inter + JetBrains Mono)
│   │   ├── page.tsx                    # Landing page / feature showcase
│   │   ├── globals.css                 # CSS variables palet zinc (Light/Dark)
│   │   ├── loading.tsx                 # Global loading skeleton
│   │   ├── error.tsx                   # Client error boundary dengan retry
│   │   ├── not-found.tsx               # Halaman 404
│   │   └── forbidden.tsx               # Halaman 403
│   │
│   ├── components/
│   │   ├── ui/                         # UI Primitives: button, input, card, badge,
│   │   │                               # dialog, dropdown-menu, table, skeleton,
│   │   │                               # avatar, separator, label
│   │   ├── common/                     # Shared components: header, sidebar, user-nav,
│   │   │                               # theme-toggle, empty-state, page-header
│   │   └── providers/
│   │       ├── app-provider.tsx        # QueryClient, ThemeProvider, Toaster
│   │       └── theme-provider.tsx      # NextThemes wrapper
│   │
│   ├── features/                       # Modul bisnis terisolasi per domain
│   │   ├── auth/
│   │   │   ├── components/             # login-form.tsx, register-form.tsx
│   │   │   ├── hooks/                  # use-login.ts, use-register.ts, use-auth.ts
│   │   │   ├── services/               # auth.service.ts (HTTP endpoints)
│   │   │   ├── types/                  # User, AuthTokens, LoginPayload
│   │   │   └── validations/            # Skema Zod login & register
│   │   └── dashboard/
│   │       ├── components/             # stats-cards, metrics-chart, recent-transactions
│   │       ├── hooks/                  # use-dashboard.ts (React Query hooks)
│   │       ├── services/               # dashboard.service.ts
│   │       └── types/                  # Transaction, DashboardMetrics, ChartDataPoint
│   │
│   ├── hooks/                          # UI Utilities: use-debounce, use-media-query
│   ├── lib/
│   │   ├── api-client.ts               # Axios instance + interceptor + token refresh
│   │   ├── query-client.ts             # TanStack Query singleton factory
│   │   ├── utils.ts                    # cn(), formatCurrency(), formatDate()
│   │   ├── constants.ts                # STORAGE_KEYS, COOKIE_KEYS, ROUTES
│   │   └── env.ts                      # Zod schema validation untuk env variables
│   │
│   ├── stores/
│   │   └── auth-store.ts               # Zustand store (state, cookies, localStorage)
│   ├── types/
│   │   ├── api.ts                      # ApiResponse<T>, PaginatedResponse<T>, ApiError
│   │   └── global.ts
│   ├── config/
│   │   ├── site.ts                     # Metadata situs & SEO default
│   │   └── navigation.ts               # Menu navigasi sidebar & role RBAC
│   └── middleware.ts                   # Route guard berbasis token cookie
│
├── .dockerignore
├── .env.example
├── .env.local
├── .gitignore
├── components.json
├── Dockerfile                          # Multi-stage standalone production build
├── eslint.config.mjs
├── next.config.ts                      # Standalone output & env validation trigger
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 3. Panduan Memulai (Getting Started)

### Prasyarat
- Node.js >= 20.x atau 22.x LTS
- npm atau pnpm

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel sesuai kebutuhan:
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_API_TIMEOUT=15000
```

> **Catatan Validasi:** Variabel di atas divalidasi langsung oleh Zod melalui `src/lib/env.ts` saat Next.js melakukan compile/build. Jika ada variabel yang tidak sesuai format URL atau tipe datanya, build akan langsung berhenti dengan pesan error yang jelas.

### 3. Menjalankan Development Server
```bash
npm run dev
```
Buka browser pada `http://localhost:3000`.

### 4. Akun Coba Tanpa Backend (Offline Dev Mock)
Untuk memudahkan prototyping sebelum backend API siap, sistem auth dilengkapi fallback mock:
- **Email:** `admin@apex.local`
- **Password:** `admin123`

---

## 4. Pola Arsitektur Utama

### A. Kontrak API Terstandarisasi (`src/types/api.ts`)
Semua endpoint diharapkan mengembalikan format kontrak yang konsisten:
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
```

### B. Axios Silent Refresh Interceptor (`src/lib/api-client.ts`)
Ketika backend merespons dengan HTTP `401 Unauthorized`:
1. Request pertama yang gagal akan menahan antrean (`failedQueue`) dan memanggil `POST /auth/refresh` dengan `refreshToken`.
2. Jika refresh berhasil, token baru disimpan di Zustand & cookie, dan seluruh request di dalam antrean otomatis diulang (*replayed*) tanpa perlu reload halaman.
3. Jika refresh gagal, session dibersihkan dan pengguna diarahkan ke `/login`.

### C. Route Guarding (`src/middleware.ts`)
- Rute `/(dashboard)/*` diproteksi secara instan di level edge/server sebelum komponen di-render.
- Jika cookie token tidak ditemukan, request langsung di-redirect ke `/login?redirect=<target_path>`.
- Jika pengguna yang sudah login membuka `/login` atau `/register`, mereka langsung di-redirect ke `/dashboard`.

---

## 5. Deployment dengan Docker

Image dikompilasi menggunakan multi-stage build dengan user non-root (`nextjs`) dan output standalone:

```bash
# Build image
docker build -t nextjs-boilerplate:latest .

# Run container
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=https://app.domain.com \
  -e NEXT_PUBLIC_API_URL=https://api.domain.com/v1 \
  --name web-app nextjs-boilerplate:latest
```

Healthcheck container tersedia di:
```bash
curl http://localhost:3000/api/health
```

---

## 6. Scripts Tersedia

| Command | Keterangan |
| :--- | :--- |
| `npm run dev` | Menjalankan server development dengan Turbopack |
| `npm run build` | Membuat build produksi teroptimasi (standalone) |
| `npm run start` | Menjalankan build produksi secara lokal |
| `npm run lint` | Menjalankan linter ESLint dengan konfigurasi Next.js |
| `npm run type-check` | Menjalankan static typechecking TypeScript tanpa emit file |
