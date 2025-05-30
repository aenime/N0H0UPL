import { NextApiRequest, NextApiResponse } from 'next';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  upiId: string;
  active: boolean;
  published: boolean;
}

// In-memory storage for development (would be database in production)
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
    // Get current payment settings
    return res.status(200).json({
      success: true,
      data: paymentSettings
    });
  }

  if (req.method === 'POST') {
    // Save payment settings
    try {
      const { paymentMethods } = req.body;
      
      if (!paymentMethods || !Array.isArray(paymentMethods)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid payment methods data'
        });
      }

      // Validate and save the payment settings
      paymentSettings = paymentMethods.map((method: PaymentMethod) => ({
        id: method.id,
        name: method.name,
        icon: method.icon,
        upiId: method.upiId || '',
        active: Boolean(method.active),
        published: Boolean(method.published)
      }));

      return res.status(200).json({
        success: true,
        message: 'Payment settings saved successfully',
        data: paymentSettings
      });
    } catch (error) {
      console.error('Error saving payment settings:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save payment settings'
      });
    }
  }

  if (req.method === 'PATCH') {
    // Update specific payment method
    try {
      const { methodId, field, value } = req.body;
      
      if (!methodId || !field) {
        return res.status(400).json({
          success: false,
          error: 'Method ID and field are required'
        });
      }

      const methodIndex = paymentSettings.findIndex(method => method.id === methodId);
      
      if (methodIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Payment method not found'
        });
      }

      // Update the specific field
      paymentSettings[methodIndex] = {
        ...paymentSettings[methodIndex],
        [field]: value
      };

      return res.status(200).json({
        success: true,
        message: 'Payment method updated successfully',
        data: paymentSettings
      });
    } catch (error) {
      console.error('Error updating payment method:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update payment method'
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}
