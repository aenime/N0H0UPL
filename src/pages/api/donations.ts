import type { NextApiRequest, NextApiResponse } from 'next';
import { Donation } from '../../types';
import { connectToDatabase } from '../../utils/mongodb';

type ResponseData = {
  success: boolean;
  donation?: Donation;
  error?: string;
  donations?: Donation[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET request for fetching donations
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const donationsData = await db.collection('donations').find({}).limit(100).toArray();
      
      // Map MongoDB documents to our Donation type
      const donations: Donation[] = donationsData.map(doc => ({
        id: doc.id || doc._id.toString(),
        amount: doc.amount,
        donorName: doc.donorName,
        email: doc.email,
        date: new Date(doc.date),
        transactionId: doc.transactionId,
        purpose: doc.purpose,
        paymentMethod: doc.paymentMethod
      }));
      
      return res.status(200).json({
        success: true,
        donations
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch donations'
      });
    }
  }
  
  // Only allow POST requests for donations
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Extract donation data from request body
    const { amount, name, email, purpose, paymentMethod } = req.body;

    // Basic validation - simplified
    if (!amount || !name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a positive number',
      });
    }
    
    // Create donation record
    const donation: Donation = {
      id: `don_${Date.now()}`,
      amount: Number(amount),
      donorName: name,
      email: email || "anonymous@example.com",
      purpose: purpose || "General",
      paymentMethod: paymentMethod || "UPI",
      date: new Date(),
      transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
    };

    // Connect to MongoDB and save the donation
    const { db } = await connectToDatabase();
    await db.collection('donations').insertOne(donation);

    // Return success response with donation data
    return res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error('Donation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error processing donation',
    });
  }
}