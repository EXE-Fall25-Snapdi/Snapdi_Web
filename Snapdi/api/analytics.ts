// Vercel Analytics API endpoint
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const vercelToken = process.env.VERCEL_ACCESS_TOKEN;

    if (!vercelToken) {
      return res.status(401).json({ error: 'Vercel access token not configured' });
    }

    // Your Vercel project slug (from snapdi-web.vercel.app)
    const projectId = 'snapdi-web';
    const since = '7d'; // Last 7 days

    // Fetch analytics data from Vercel API
    const [pageviewsRes, topPagesRes] = await Promise.all([
      // Page views endpoint
      fetch(`https://api.vercel.com/v1/analytics/pageviews?projectId=${projectId}&since=${since}`, {
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
      }),
      // Top pages endpoint  
      fetch(`https://api.vercel.com/v1/analytics/top-pages?projectId=${projectId}&since=${since}`, {
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
          'Content-Type': 'application/json',
        },
      })
    ]);

    if (!pageviewsRes.ok || !topPagesRes.ok) {
      throw new Error('Failed to fetch from Vercel Analytics API');
    }

    const pageviewsData = await pageviewsRes.json();
    const topPagesData = await topPagesRes.json();

    // Transform to our format
    const analyticsData = {
      pageViews: processPageViews(pageviewsData),
      topPages: processTopPages(topPagesData),
      deviceTypes: [
        { name: 'Desktop', value: 45, color: '#34D399' },
        { name: 'Mobile', value: 40, color: '#10B981' },
        { name: 'Tablet', value: 15, color: '#6EE7B7' },
      ],
      stats: {
        totalViews: calculateTotalViews(pageviewsData),
        uniqueVisitors: calculateUniqueVisitors(pageviewsData),
        bounceRate: '65%',
        avgSessionDuration: '2m 45s',
      }
    };

    res.status(200).json(analyticsData);
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
}

function processPageViews(data: any) {
  // Transform Vercel pageviews data to our format
  if (!data.pageviews || !Array.isArray(data.pageviews)) {
    return [];
  }

  return data.pageviews.map((item: any) => ({
    date: item.date,
    views: item.views || 0,
    visitors: item.visitors || 0,
  }));
}

function processTopPages(data: any) {
  // Transform Vercel top pages data to our format
  if (!data.pages || !Array.isArray(data.pages)) {
    return [];
  }

  const totalViews = data.pages.reduce((sum: number, page: any) => sum + (page.views || 0), 0);

  return data.pages.slice(0, 5).map((page: any) => ({
    path: page.path || '/',
    views: page.views || 0,
    percentage: totalViews > 0 ? Math.round((page.views / totalViews) * 100) : 0,
  }));
}

function calculateTotalViews(data: any) {
  if (!data.pageviews || !Array.isArray(data.pageviews)) {
    return 0;
  }
  return data.pageviews.reduce((sum: number, item: any) => sum + (item.views || 0), 0);
}

function calculateUniqueVisitors(data: any) {
  if (!data.pageviews || !Array.isArray(data.pageviews)) {
    return 0;
  }
  return data.pageviews.reduce((sum: number, item: any) => sum + (item.visitors || 0), 0);
}