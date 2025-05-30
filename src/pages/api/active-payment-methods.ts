import { NextApiRequest, NextApiResponse } from 'next';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  upiId: string;
  active: boolean;
  published: boolean;
}

// This would normally come from a database, but for now we'll use the same in-memory storage
// In a real app, this would be shared through a database
let paymentSettings: PaymentMethod[] = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: '📱',
    upiId: '',
    active: false,
    published: false
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: '🟣',
    upiId: '',
    active: false,
    published: false
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: '🔵',
    upiId: '',
    active: false,
    published: false
  },
  {
    id: 'qr',
    name: 'QR Code',
    icon: '📋',
    upiId: '',
    active: false,
    published: false
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get only active and published payment methods for donation page
    const activeMethods = paymentSettings.filter(method => 
      method.active && 
      method.published && 
      method.upiId.trim() !== ''
    );

    return res.status(200).json({
      success: true,
      data: activeMethods,
      count: activeMethods.length
    });
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
