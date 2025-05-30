import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../utils/mongodb';

interface DashboardStats {
  totalDonations: {
    amount: number;
    count: number;
    growthRate: number;
  };
  recentDonors: number;
  monthlyGrowth: number;
  avgDonation: number;
  conversionRate: number;
  pageViews: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardStats | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    
    // Get all donations
    const donations = await db.collection('donations').find({}).toArray();
    
    // Calculate current month stats
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    
    const currentMonthDonations = donations.filter(d => new Date(d.date) >= currentMonthStart);
    const lastMonthDonations = donations.filter(d => 
      new Date(d.date) >= lastMonthStart && new Date(d.date) <= lastMonthEnd
    );
    
    // Calculate totals
    const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const totalCount = donations.length;
    const avgDonation = totalCount > 0 ? totalAmount / totalCount : 0;
    
    // Calculate growth rate
    const currentMonthAmount = currentMonthDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const lastMonthAmount = lastMonthDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const growthRate = lastMonthAmount > 0 ? ((currentMonthAmount - lastMonthAmount) / lastMonthAmount) * 100 : 0;
    
    // Recent unique donors (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentDonations = donations.filter(d => new Date(d.date) >= thirtyDaysAgo);
    const uniqueDonors = new Set(recentDonations.map(d => d.email || d.donorName)).size;
    
    const stats: DashboardStats = {
      totalDonations: {
        amount: Math.round(totalAmount),
        count: totalCount,
        growthRate: Math.round(growthRate * 100) / 100
      },
      recentDonors: uniqueDonors,
      monthlyGrowth: Math.round(growthRate * 100) / 100,
      avgDonation: Math.round(avgDonation),
      conversionRate: 8.2, // This would need additional tracking
      pageViews: 12456 // This would need analytics integration
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}