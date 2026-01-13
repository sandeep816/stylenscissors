# Vercel Deployment Guide - Style & Scissors

## 🚀 Vercel Par Deploy Karne Ke Steps

### Prerequisites (Pehle Ye Check Karein):

- ✅ GitHub account
- ✅ Vercel account (free tier available)
- ✅ Code GitHub par push ho chuka ho
- ✅ Environment variables ready hain

---

## Step 1: GitHub Repository Setup

### 1.1 GitHub Par Code Push Karein

```bash
# Agar pehle se git initialize nahi hai
git init

# Remote repository add karein
git remote add origin https://github.com/sandeep816/stylenscissors.git

# Sab files add karein
git add .

# Commit karein
git commit -m "Initial commit - Style & Scissors website"

# Main branch par push karein
git branch -M main
git push -u origin main
```

**Note:** Agar repository already exist karti hai, to:

```bash
git remote set-url origin https://github.com/sandeep816/stylenscissors.git
git push -u origin main
```

---

## Step 2: Vercel Account Setup

### 2.1 Vercel Account Banayein

1. [Vercel.com](https://vercel.com) par jayein
2. "Sign Up" button par click karein
3. "Continue with GitHub" select karein
4. GitHub account se login karein
5. Vercel ko GitHub access de dein

---

## Step 3: Project Deploy Karein

### 3.1 New Project Create Karein

1. Vercel dashboard me jayein
2. "Add New..." button par click karein
3. "Project" select karein
4. GitHub repository select karein: `sandeep816/stylenscissors`
5. "Import" button par click karein

### 3.2 Project Configuration

**Framework Preset:**

- Automatically detect hoga: **Next.js**

**Root Directory:**

- `.` (default - project root)

**Build Command:**

- `npm run build` (auto-detect)

**Output Directory:**

- `.next` (auto-detect)

**Install Command:**

- `npm install` (auto-detect)

### 3.3 Environment Variables Add Karein

**Important:** Ye step zaroori hai!

1. "Environment Variables" section me jayein
2. Neeche diye gaye variables add karein:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-13
```

**Kaise Add Karein:**

- Variable name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Value: Apna Sanity Project ID
- Environment: **Production**, **Preview**, **Development** (sab me select karein)
- "Add" button par click karein

**Same process se baaki 2 variables bhi add karein:**

- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### 3.4 Deploy Button Par Click Karein

1. Sab environment variables add karne ke baad
2. "Deploy" button par click karein
3. Build process start ho jayega (2-3 minutes lag sakte hain)

---

## Step 4: Deployment Complete

### 4.1 Deployment Status Check Karein

- Build logs real-time dikhenge
- Agar successful hai, to "Congratulations!" message aayega
- Website URL automatically generate ho jayega:
  - Format: `https://stylenscissors.vercel.app`
  - Ya custom domain (agar add kiya ho)

### 4.2 Website Test Karein

1. Generated URL par click karein
2. Homepage check karein
3. Sanity Studio check karein: `https://your-url.vercel.app/studio`
4. Sab pages test karein

---

## Step 5: Custom Domain (Optional)

### 5.1 Domain Add Karein

1. Vercel dashboard me project select karein
2. "Settings" tab par jayein
3. "Domains" section me jayein
4. Apna domain add karein (e.g., `stylenscissors.com`)
5. DNS settings follow karein (Vercel automatically provide karega)

---

## Step 6: Future Updates

### 6.1 Code Update Karein

Jab bhi code update karna ho:

```bash
# Changes karein
git add .
git commit -m "Update: description of changes"
git push origin main
```

**Vercel automatically:**

- ✅ New deployment start karega
- ✅ Build process run karega
- ✅ Production me deploy ho jayega
- ✅ Old version backup rahega

### 6.2 Deployment History

- Vercel dashboard me sab deployments dikhenge
- Kisi bhi previous version par rollback kar sakte hain
- Preview deployments bhi available hain (PR ke liye)

---

## 🔧 Troubleshooting

### Problem: Build Failed

**Solution:**

1. Build logs check karein
2. Common issues:
   - Environment variables missing
   - TypeScript errors
   - Missing dependencies
3. Local me `npm run build` run karke check karein

### Problem: Environment Variables Not Working

**Solution:**

1. Vercel dashboard me variables check karein
2. `NEXT_PUBLIC_` prefix zaroori hai
3. Redeploy karein after adding variables

### Problem: Sanity Studio Not Loading

**Solution:**

1. Environment variables check karein
2. Sanity project ID correct hai ya nahi
3. CORS settings check karein (Sanity dashboard me)

---

## 📋 Quick Checklist

Deploy karne se pehle:

- [ ] Code GitHub par push ho chuka hai
- [ ] `.env.local` file me variables hain (reference ke liye)
- [ ] `npm run build` local me successfully run ho raha hai
- [ ] Sanity project ID ready hai
- [ ] Vercel account ban chuka hai
- [ ] GitHub repository Vercel se connected hai

Deploy ke baad:

- [ ] Environment variables add kiye hain
- [ ] Build successful hai
- [ ] Website load ho rahi hai
- [ ] Sanity Studio accessible hai
- [ ] Sab pages kaam kar rahe hain

---

## 🎯 Important URLs

After deployment, aapko ye URLs milenge:

- **Production URL:** `https://stylenscissors.vercel.app`
- **Sanity Studio:** `https://stylenscissors.vercel.app/studio`
- **Vercel Dashboard:** `https://vercel.com/dashboard`

---

## 📞 Support

Agar koi problem aaye:

1. **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
2. **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
3. **Sanity Docs:** [sanity.io/docs](https://www.sanity.io/docs)

---

## ✅ Success!

Agar sab kuch theek hai, to aapka website ab live hai! 🎉

**Next Steps:**

1. Sanity Studio me content add karein
2. Website test karein
3. Client ko demo dikhayein
4. Feedback ke basis par improvements karein

---

**Made with ❤️ for Style & Scissors**
