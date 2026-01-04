# IntegrateAPI Marketing Site

Modern, professional marketing website for IntegrateAPI - a business automation and integration consulting firm.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4 + Framer Motion
- **Routing**: Wouter (lightweight SPA router)
- **Backend**: Express + TypeScript
- **Database**: PostgreSQL + Drizzle ORM
- **UI Components**: Radix UI + shadcn/ui

## Prerequisites

- Node.js 20+ (LTS recommended)
- PostgreSQL 14+ (for backend features)
- npm or pnpm

## Local Development Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd Marketing-Site-Builder
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SESSION_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
PORT=5000
```

**Required Environment Variables:**

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes (for backend) |
| `SESSION_SECRET` | Secret key for session encryption | Yes (for backend) |
| `NODE_ENV` | Environment (`development` or `production`) | No (defaults to `development`) |
| `PORT` | Backend server port | No (defaults to `3000`) |
| `FRONTEND_URL` | Production frontend URL for CORS | No (for production deployment) |

### 3. Database Setup

```bash
# Push database schema
npm run db:push
```

### 4. Start Development Server

```bash
# Starts both frontend (Vite) and backend (Express)
npm run dev
```

The site will be available at `http://localhost:3000`

## Build Commands

```bash
# Type checking
npm run check

# Production build (builds both client and server)
npm run build

# Start production server
npm start
```

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   └── main.tsx       # App entry point
│   ├── public/            # Static assets
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database configuration
├── shared/                # Shared types and schemas
└── dist/                  # Production build output
```

## Deployment

### Recommended Setup

**Frontend**: [Vercel](https://vercel.com) (zero-config for Vite)  
**Backend**: [Railway](https://railway.app) or [Render](https://render.com) (includes PostgreSQL)

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite and uses `vite.config.ts`
4. The `vercel.json` config handles SPA routing
5. No environment variables needed for static frontend

**Build Settings (auto-detected)**:
- Build Command: `npm run build` 
- Output Directory: `dist/public`

### Backend Deployment (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables:
   ```
   DATABASE_URL=<provided-by-railway/render>
   SESSION_SECRET=<generate-random-string>
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   ```
3. Railway/Render will run `npm run build` then `npm start`

**Health Check Endpoint**: `GET /api/health`

## Features

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (meta tags, Open Graph, Twitter Cards)
- ✅ Animated UI components (Framer Motion)
- ✅ 404 error page
- ✅ Contact form
- ✅ Interactive demos
- ✅ CORS configured for production
- ✅ Session-based authentication ready

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (frontend + backend) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run check` to verify types
4. Test locally with `npm run dev`
5. Create a pull request

## License

MIT

---

**Built with calm precision by IntegrateAPI**
