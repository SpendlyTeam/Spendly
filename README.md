# Spendly

Spendly is a modern financial dashboard application designed to help you track spending, analyze trends, and stay on budget. It features a responsive design, real-time data visualization, and PDF export capabilities.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Better Auth
- **Email**: Resend
- **UI Components**: Radix UI, Lucide React
- **Charts**: Chart.js, react-chartjs-2

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm
- A PostgreSQL database (local or cloud-hosted)

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spendly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory. You can copy the example below and fill in your values.

```env
# Database Connection
DATABASE_URL="postgres://user:password@host:port/database_name"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your_generated_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# Email Service (Resend)
RESEND_API_KEY="re_123456789"
EMAIL_SENDER_NAME="Spendly"
EMAIL_SENDER_ADDRESS="account@notify.spendly.fun"
```

- **DATABASE_URL**: Your PostgreSQL connection string.
- **BETTER_AUTH_SECRET**: A 32-character random string. You can generate one using `openssl rand -hex 32`.
- **BETTER_AUTH_URL**: The URL where your app is running (usually `http://localhost:3000` for local development).
- **RESEND_API_KEY**: Your API key from [Resend](https://resend.com).

### 4. Database Setup

Synchronize your Prisma schema with your database:

```bash
npx prisma db push
```

Or, if you prefer migrations:

```bash
npx prisma migrate dev
```

(Optional) Seed the database if a seed script is provided, or create an account via the UI.

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code issues.
- `npx prisma studio`: Opens a GUI to view and edit your database.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/features`: Feature-based modules (e.g., dashboard, transactions, categories) containing UI, model, and logic.
- `src/components`: Shared UI components and layout elements.
- `src/lib`: Utility functions, authentication configuration, and external service clients.
- `src/shared`: Shared API and helper functions.
