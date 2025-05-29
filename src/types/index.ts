// Animal type definition
export type Animal = {
  id: string;
  name: string;
  image: string;
  breed: string;
  age: string;
  description: string;
  story?: string;
  status: 'available' | 'adopted' | 'foster' | 'sanctuary';
};

// Donation type definition
export type Donation = {
  id: string;
  amount: number;
  donorName: string;
  email: string;
  date: Date;
  transactionId: string;
  purpose?: string;
  paymentMethod?: string;
};

// User type definition (for authentication)
export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};