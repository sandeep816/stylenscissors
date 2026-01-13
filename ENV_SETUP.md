# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
# Get these from https://www.sanity.io/manage

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-13
```

## How to Get Your Sanity Credentials:

1. Go to [Sanity.io](https://www.sanity.io)
2. Sign in or create an account
3. Create a new project or select existing one
4. Go to Project Settings → API
5. Copy your Project ID
6. Your dataset name is usually "production" or "development"

## Important Notes:

- Never commit `.env.local` to git (it's already in .gitignore)
- Use `NEXT_PUBLIC_` prefix for variables that need to be accessible in the browser
- Restart your dev server after adding/changing environment variables
