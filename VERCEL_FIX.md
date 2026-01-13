# 🔧 Vercel Build Error Fix

## Problem

```
Error: Missing environment variable: NEXT_PUBLIC_SANITY_DATASET
```

## Solution

### Step 1: Vercel Dashboard Me Environment Variables Add Karein

1. **Vercel Dashboard** me jayein
2. Apna project select karein
3. **Settings** tab par click karein
4. **Environment Variables** section me jayein

### Step 2: Ye 3 Variables Add Karein

**Variable 1:**

- **Name:** `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Value:** Apna Sanity Project ID (e.g., `abc123xyz`)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development (sab me select karein)
- **Add** button click karein

**Variable 2:**

- **Name:** `NEXT_PUBLIC_SANITY_DATASET`
- **Value:** `production` (ya jo bhi dataset name hai)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Add** button click karein

**Variable 3:**

- **Name:** `NEXT_PUBLIC_SANITY_API_VERSION`
- **Value:** `2025-01-13`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Add** button click karein

### Step 3: Redeploy Karein

1. **Deployments** tab par jayein
2. Latest deployment par click karein
3. **Redeploy** button par click karein
4. Ya **"..."** menu se **Redeploy** select karein

---

## ⚠️ Important Notes

### 1. Variable Names Exact Hone Chahiye

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (exact spelling)
- `NEXT_PUBLIC_SANITY_DATASET` (exact spelling)
- `NEXT_PUBLIC_SANITY_API_VERSION` (exact spelling)

### 2. Sab Environments Me Add Karein

- Production ✅
- Preview ✅
- Development ✅

### 3. Values Check Karein

- Project ID: Sanity dashboard se copy karein
- Dataset: Usually `production` ya `development`
- API Version: `2025-01-13` (current version)

---

## 🔍 Kaise Check Karein Ki Variables Add Ho Gaye

1. Vercel Dashboard → Project → Settings → Environment Variables
2. 3 variables dikhne chahiye
3. Har variable ke saamne environments dikhenge

---

## 📸 Visual Guide

### Environment Variables Section:

```
┌─────────────────────────────────────────┐
│ Environment Variables                   │
├─────────────────────────────────────────┤
│ Name                          Value     │
├─────────────────────────────────────────┤
│ NEXT_PUBLIC_SANITY_PROJECT_ID abc123... │
│ NEXT_PUBLIC_SANITY_DATASET     production│
│ NEXT_PUBLIC_SANITY_API_VERSION 2025-01-13│
└─────────────────────────────────────────┘
```

---

## ✅ After Adding Variables

1. **Redeploy** karein (important!)
2. Build logs check karein
3. Agar successful hai, to website live ho jayega

---

## 🔧 Additional Fix: Image Configuration

Agar aapko ye error aaye:
```
hostname "cdn.sanity.io" is not configured under images
```

**Solution:** `next.config.ts` file me ye add karein:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
```

**Note:** Ye fix already project me add ho chuka hai! ✅

---

## 🆘 Agar Phir Bhi Error Aaye

### Check 1: Variable Names

- Spelling exact hai ya nahi?
- Extra spaces to nahi hain?
- Case sensitive hai (uppercase/lowercase)

### Check 2: Values

- Project ID correct hai?
- Dataset name correct hai?
- API version correct hai?

### Check 3: Environments

- Sab 3 environments (Production, Preview, Development) me add kiye hain?

### Check 4: Redeploy

- Variables add karne ke baad redeploy kiya hai?

---

## 📋 Quick Checklist

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` add kiya
- [ ] `NEXT_PUBLIC_SANITY_DATASET` add kiya
- [ ] `NEXT_PUBLIC_SANITY_API_VERSION` add kiya
- [ ] Sab 3 environments me add kiye
- [ ] Redeploy kiya
- [ ] Build successful hai

---

**After fixing, your build should succeed! 🎉**
