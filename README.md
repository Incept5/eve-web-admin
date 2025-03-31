# Eve Horizon

This is the web admin interface for Eve Horizon, providing access to API keys and authentication.

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or pnpm

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   pnpm dev
   ```

## Building for Production

To build the application for production:

```
npm run build
```
or
```
pnpm build
```

## Deployment

This project is configured to deploy to GitHub Pages automatically when changes are pushed to the main branch.

## Backend

The application uses Supabase for authentication and data storage. The backend configuration remains the same as the original implementation.