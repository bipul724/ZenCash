<p align="center">
  <img src="public/cover1.png" alt="ZenCash Logo" width="280" />
</p>

<h1 align="center">ZenCash</h1>

<p align="center">
  <strong>Your All-in-One Personal Finance Platform</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/Features-✨-blue?style=for-the-badge" alt="Features" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs" alt="Next.js 15" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma" alt="Prisma 6" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  ZenCash is a modern, AI-powered personal finance management platform that helps you take control of your money. Track income &amp; expenses, set budgets, scan receipts with AI, automate recurring transactions, and receive intelligent monthly financial reports — all from a single, beautifully designed dashboard.
</p>

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact / Acknowledgements](#contact--acknowledgements)

---

## ✨ Features

### Core Finance Management
- **Multi-Account Support** — Create and manage multiple accounts (Savings & Current) with independent balance tracking
- **Transaction Tracking** — Log income and expenses with rich categorization (20+ built-in categories)
- **Budget Planning** — Set monthly budgets and track spending against them with visual progress indicators
- **Dashboard Analytics** — Comprehensive financial overview with interactive charts powered by Recharts

### AI-Powered Intelligence
- **Smart Receipt Scanner** — Upload a receipt photo and let Google Gemini AI automatically extract amount, date, category, and merchant details
- **Monthly Financial Reports** — AI-generated insights analyzing your spending patterns with actionable recommendations
- **Budget Alerts** — Automated email notifications when you approach or exceed your budget threshold (80%+)

### Automation & Scheduling
- **Recurring Transactions** — Set up daily, weekly, monthly, or yearly recurring transactions that process automatically
- **Background Job Processing** — Powered by Inngest for reliable cron-based job scheduling and event-driven workflows
- **Email Notifications** — Beautiful HTML email reports and alerts via Resend and React Email

### Security & Performance
- **Authentication** — Secure sign-in/sign-up powered by Clerk with protected routes
- **Rate Limiting** — API abuse prevention with Arcjet token-bucket rate limiting
- **Optimistic UI** — Fast, responsive interface with server actions and real-time cache revalidation
- **Turbopack** — Lightning-fast development builds with Next.js Turbopack

### User Experience
- **Responsive Design** — Fully responsive layout that works beautifully on desktop, tablet, and mobile
- **Animated Landing Page** — Stunning hero section with scroll animations, testimonials, and glassmorphism effects
- **Bulk Operations** — Select and delete multiple transactions at once
- **Database Seeding** — One-click seed script to populate your account with 90 days of sample transaction data

---

## 🛠️ Tech Stack

| Layer            | Technology                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| **Framework**    | [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Turbopack) |
| **Language**     | JavaScript (ES2024)                                                        |
| **UI Library**   | [React 19](https://react.dev/)                                             |
| **Styling**      | [Tailwind CSS 4](https://tailwindcss.com/)                                 |
| **UI Components**| [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Animations**   | [Motion](https://motion.dev/) (Framer Motion)                              |
| **Charts**       | [Recharts](https://recharts.org/)                                          |
| **Database**     | PostgreSQL (via [Supabase](https://supabase.com/))                         |
| **ORM**          | [Prisma 6](https://www.prisma.io/)                                         |
| **Auth**         | [Clerk](https://clerk.com/)                                                |
| **AI**           | [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)           |
| **Background Jobs** | [Inngest](https://www.inngest.com/)                                    |
| **Email**        | [Resend](https://resend.com/) + [React Email](https://react.email/)       |
| **Rate Limiting**| [Arcjet](https://arcjet.com/)                                              |
| **Validation**   | [Zod 4](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **Icons**        | [Lucide React](https://lucide.dev/) + [Tabler Icons](https://tabler.io/icons) |

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** — v18.17 or later → [Download](https://nodejs.org/)
- **npm** — v9+ (comes with Node.js) or **yarn** / **pnpm**
- **Git** — [Download](https://git-scm.com/)

You will also need accounts (free tiers available) for the following services:

| Service        | Purpose                | Sign Up                                        |
| -------------- | ---------------------- | ---------------------------------------------- |
| **Clerk**      | Authentication         | [clerk.com](https://clerk.com/)                |
| **Supabase**   | PostgreSQL Database    | [supabase.com](https://supabase.com/)          |
| **Google AI**  | Gemini API (Receipts)  | [ai.google.dev](https://ai.google.dev/)        |
| **Resend**     | Transactional Emails   | [resend.com](https://resend.com/)              |
| **Arcjet**     | Rate Limiting          | [arcjet.com](https://arcjet.com/)              |
| **Inngest**    | Background Jobs        | [inngest.com](https://www.inngest.com/)        |

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/zencash.git
cd zencash/ZenCash
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the `ZenCash` directory. Use the [`.env.example`](#configuration) section below as a template:

```bash
cp .env.example .env
```

Then fill in your credentials (see [Configuration](#configuration) for details).

### 4. Set up the database

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server

```bash
npm run dev
```

The app will be running at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 💡 Usage

### Running the App

```bash
# Development (with Turbopack for fast refresh)
npm run dev

# Production build
npm run build
npm start

# Lint your code
npm run lint
```

### Email Template Development

Preview and iterate on email templates locally:

```bash
npm run email
```

### Database Seeding

After creating an account and at least one financial account in the dashboard, you can seed 90 days of sample transaction data via the built-in seed action from the app UI.

### Key Workflows

1. **Sign Up / Sign In** — Create an account through the Clerk-powered auth pages
2. **Create a Financial Account** — Add a Savings or Current account from the dashboard
3. **Add Transactions** — Log income or expenses manually, or scan a receipt for auto-fill
4. **Set a Budget** — Define your monthly spending limit and receive alerts
5. **View Analytics** — Explore your spending patterns on the interactive dashboard
6. **Recurring Transactions** — Set up transactions that repeat on a schedule

---

## 📁 Project Structure

```
ZenCash/
├── actions/                    # Server Actions (business logic)
│   ├── accounts.js             #   Account CRUD & bulk operations
│   ├── budget.js               #   Budget management
│   ├── dashboard.js            #   Dashboard data & account creation
│   ├── seed.js                 #   Database seeding script
│   ├── send-email.js           #   Email sending utility
│   └── transaction.js          #   Transaction CRUD & receipt scanning
│
├── app/                        # Next.js App Router
│   ├── (auth)/                 #   Auth route group (sign-in, sign-up)
│   ├── (main)/                 #   Protected route group
│   │   ├── account/[id]/       #     Individual account view
│   │   ├── dashboard/          #     Main dashboard with analytics
│   │   ├── pricing/            #     Pricing page
│   │   └── transactions/      #     Transaction management
│   ├── api/                    #   API routes (Inngest, seed)
│   ├── lib/                    #   App-level utilities
│   ├── globals.css             #   Global styles & Tailwind config
│   ├── layout.js               #   Root layout (Clerk, Toaster, Header)
│   ├── page.jsx                #   Landing page
│   └── not-found.jsx           #   Custom 404 page
│
├── components/                 # React components
│   ├── ui/                     #   Reusable UI primitives (shadcn/ui + custom)
│   ├── navbar.jsx              #   Navigation bar
│   ├── createAccountDrawer.jsx #   Account creation drawer
│   ├── HeroScrollDemo.jsx      #   Hero section with scroll animation
│   ├── StatsSection.jsx        #   Landing page stats
│   ├── Testimonials.jsx        #   User testimonials carousel
│   └── GridBackgroundDemo.jsx  #   Animated grid background
│
├── data/                       # Static data & constants
│   ├── categories.js           #   Income/expense category definitions
│   └── landing.js              #   Landing page content data
│
├── emails/                     # React Email templates
│   └── template.jsx            #   Monthly report & budget alert emails
│
├── hooks/                      # Custom React hooks
│   └── useFetch.js             #   Generic async data fetching hook
│
├── lib/                        # Shared utilities & configurations
│   ├── inngest/                #   Inngest client & background functions
│   │   ├── client.js           #     Inngest client setup
│   │   └── function.js         #     Recurring txns, reports, budget alerts
│   ├── arcjet.js               #   Arcjet rate limiting config
│   ├── checkUser.js            #   User verification utility
│   ├── prisma.js               #   Prisma client singleton
│   └── utils.js                #   General utility functions
│
├── prisma/                     # Database schema & migrations
│   ├── schema.prisma           #   Data models (User, Account, Transaction, Budget)
│   └── migrations/             #   Migration history
│
├── public/                     # Static assets (images, favicon)
├── middleware.js                # Clerk auth middleware & route protection
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies & scripts
└── .gitignore                  # Git ignore rules
```

---

## ⚙️ Configuration

Create a `.env` file in the project root with the following variables:

```env
# ──────────────────────────────────────────────
# 🔐 Authentication (Clerk)
# ──────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# ──────────────────────────────────────────────
# 🗄️ Database (Supabase PostgreSQL)
# ──────────────────────────────────────────────
# Connection pooling URL (for application queries)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection URL (for Prisma migrations)
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:5432/postgres"

# ──────────────────────────────────────────────
# 🤖 AI (Google Gemini)
# ──────────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here

# ──────────────────────────────────────────────
# 📧 Email (Resend)
# ──────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxx

# ──────────────────────────────────────────────
# 🛡️ Rate Limiting (Arcjet)
# ──────────────────────────────────────────────
ARCJET_KEY=ajkey_xxxxxxxxxxxxx

# ──────────────────────────────────────────────
# ⚡ Background Jobs (Inngest)
# ──────────────────────────────────────────────
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

> **💡 Tip:** Copy this block into a `.env.example` file and commit it to your repo (without real values) so collaborators know what keys are needed.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/zencash.git
   ```
3. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies** and set up your environment (see [Installation](#installation))

### Development Guidelines

- **Branching Strategy**
  - `main` — Production-ready code
  - `feature/*` — New features
  - `fix/*` — Bug fixes
  - `chore/*` — Maintenance tasks (deps, configs, docs)

- **Code Style**
  - Follow the existing ESLint configuration (`eslint-config-next`)
  - Use functional components with hooks
  - Server Actions go in the `actions/` directory
  - Reusable UI components belong in `components/ui/`
  - Keep components focused and single-responsibility

- **Commit Messages** — Use clear, descriptive commit messages:
  ```
  feat: add multi-currency conversion support
  fix: resolve balance calculation on recurring transactions
  docs: update README with Inngest setup instructions
  ```

### Submitting a Pull Request

1. Ensure your code passes linting: `npm run lint`
2. Test your changes thoroughly
3. Push your branch and open a PR against `main`
4. Provide a clear description of what your PR does and why

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project. See the [LICENSE](LICENSE) file for full details.

---

## 📬 Contact / Acknowledgements

### Author

**Bipul Chamoli** — *Creator & Maintainer*

- GitHub: [@bipulchamoli](https://github.com/bipulchamoli)

### Acknowledgements

This project was built with the help of these amazing open-source tools and services:

- [Next.js](https://nextjs.org/) — The React framework for production
- [Clerk](https://clerk.com/) — Authentication and user management
- [Prisma](https://www.prisma.io/) — Next-generation ORM for Node.js
- [Supabase](https://supabase.com/) — Open-source Firebase alternative (PostgreSQL hosting)
- [Google Gemini](https://ai.google.dev/) — AI-powered receipt scanning and financial insights
- [Inngest](https://www.inngest.com/) — Reliable background job processing
- [Resend](https://resend.com/) — Developer-first email API
- [React Email](https://react.email/) — Build emails with React components
- [Arcjet](https://arcjet.com/) — Security & rate limiting
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible UI components
- [Recharts](https://recharts.org/) — Composable chart library for React
- [Motion](https://motion.dev/) — Production-ready animations for React

---

<p align="center">
  Made with ❤️ by <strong>Bipul.corp</strong>
</p>
