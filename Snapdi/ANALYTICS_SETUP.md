# Vercel Analytics Integration Guide

## 🚀 Quick Setup

### 1. Get Vercel Access Token

1. Visit: https://vercel.com/account/tokens
2. Click "Create" new token
3. Name: "Snapdi Analytics"
4. Scope: "Full Account" (or select your team)
5. Copy the generated token

### 2. Configure Environment Variables

#### For Local Development:

```bash
# Create .env.local file
echo "VERCEL_ACCESS_TOKEN=your_token_here" > .env.local
```

#### For Vercel Deployment:

```bash
# Using Vercel CLI
vercel env add VERCEL_ACCESS_TOKEN

# Or add manually in Vercel Dashboard:
# Go to your project > Settings > Environment Variables
# Add: VERCEL_ACCESS_TOKEN = your_token_here
```

### 3. Deploy

```bash
git add .
git commit -m "Add Vercel Analytics integration"
git push origin main
```

## 📊 What Analytics Data You'll Get

### From https://snapdi-web.vercel.app/:

- ✅ **Page Views**: Daily views for last 7 days
- ✅ **Unique Visitors**: Daily unique visitors
- ✅ **Top Pages**: Most visited pages with percentages
- ✅ **Total Stats**: Overall metrics and trends
- ✅ **Device Types**: Desktop/Mobile/Tablet breakdown (estimated)

### API Endpoints Used:

- `https://api.vercel.com/v1/analytics/pageviews?projectId=snapdi-web&since=7d`
- `https://api.vercel.com/v1/analytics/top-pages?projectId=snapdi-web&since=7d`

## 🔧 Troubleshooting

### Common Issues:

1. **401 Unauthorized**: Check your token is correct
2. **404 Not Found**: Verify project ID is "snapdi-web"
3. **Rate Limiting**: Data updates every 5 minutes
4. **No Data**: Website needs traffic to generate analytics

### Debug Mode:

Set `useMockData = true` in `VercelAnalytics.tsx` to use sample data while testing.

## 🔒 Security Notes

- Never commit `.env.local` to git (already in .gitignore)
- Use environment variables for tokens
- Tokens should have minimal required permissions
- Consider token rotation for security

## 📱 Features

- **Auto-refresh**: Every 5 minutes
- **Error handling**: Graceful fallbacks
- **Loading states**: Smooth UX
- **Responsive**: Works on all devices
- **Real-time**: Live data from your deployed site
