# 🚀 Deployment Guide - NASA Space Biology Dashboard

## Deploy to Vercel (Recommended)

### Quick Deploy
1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy" (no configuration needed!)

### Manual Configuration (if needed)
If Vercel doesn't auto-detect the settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables
No environment variables needed! Supabase credentials are already configured in the code.

---

## ✅ What's Included

All necessary files for Vercel deployment:
- ✅ `vercel.json` - Vercel configuration
- ✅ `vite.config.ts` - Updated build settings
- ✅ `package.json` - All dependencies
- ✅ Supabase credentials hardcoded (already working)

---

## 🔧 Troubleshooting

### Issue: Build fails
**Solution:** Make sure all dependencies are in `package.json`
```bash
npm install
npm run build
```

### Issue: Page shows 404 on refresh
**Solution:** Already fixed with `vercel.json` rewrites

### Issue: Supabase not working
**Solution:** Database table must be created (see COPY_THIS_SQL.txt)

### Issue: Blank page after deploy
**Solution:** Check Vercel logs, usually a build error

---

## 📝 Deployment Checklist

- [x] Code pushed to GitHub
- [x] `vercel.json` created
- [x] `vite.config.ts` updated
- [x] Supabase credentials configured
- [x] Publications table created in Supabase
- [ ] Deploy to Vercel
- [ ] Test the live site

---

## 🎯 Post-Deployment Testing

After deployment, test these features:
1. ✅ Homepage loads
2. ✅ Publications section shows existing posts
3. ✅ Click "Post" button - dialog opens
4. ✅ Add new publication - saves successfully
5. ✅ Click publication card - detail view opens
6. ✅ Delete button works
7. ✅ Filters work (species, missions, year)

---

## 🌐 Your Live URL

After deployment, Vercel will give you a URL like:
```
https://your-project-name.vercel.app
```

You can also add a custom domain in Vercel settings!

---

## 💡 Tips

1. **Auto-deploy:** Any push to GitHub will auto-deploy to Vercel
2. **Preview deployments:** Pull requests get preview URLs
3. **Logs:** Check Vercel dashboard for build/runtime logs
4. **Analytics:** Enable Vercel Analytics for visitor stats

---

## 🎉 That's It!

Your NASA Space Biology Dashboard is ready for production deployment!
