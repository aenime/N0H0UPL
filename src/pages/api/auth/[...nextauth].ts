// filepath: /Users/anand.social/Documents/Donation/animal-welfare-ngo/src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { isValidEmail } from '../../../utils/helpers';
import { clientPromise, connectToDatabase } from '../../../utils/mongodb';
import type { User } from 'next-auth';

// Extend the NextAuth types to include the id in the session user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    }
  }
  
  interface User {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google authentication (would need real credentials in production)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
    }),

    // Email and password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        try {
          // Connect to the database
          const { db } = await connectToDatabase();
          
          if (isValidEmail(credentials.email) && credentials.password.length >= 6) {
            // Special case for admin login
            if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
              // Return admin user object
              return {
                id: 'admin-user-id',
                name: 'Admin',
                email: credentials.email,
                image: null,
                role: 'admin'
              } as User;
            }
            
            // Check if user exists in the database
            const user = await db.collection('users').findOne({ 
              email: credentials.email 
            });
            
            if (user) {
              // In a real app, you would verify the password here with bcrypt
              // For demo, we're assuming the password is correct
              return {
                id: user._id.toString(),
                name: user.name || credentials.email.split('@')[0],
                email: user.email,
                image: user.image || null,
                role: user.role || 'user'
              } as User;
            }
            
            // If user doesn't exist, create a new one
            const newUser = {
              name: credentials.email.split('@')[0],
              email: credentials.email,
              createdAt: new Date(),
              role: 'user',
            };
            
            const result = await db.collection('users').insertOne(newUser);
            
            return {
              id: result.insertedId.toString(),
              name: newUser.name,
              email: newUser.email,
              image: null,
              role: newUser.role
            } as User;
          }
        } catch (error) {
          console.error('Auth error:', error);
        }
        
        // Return null if user data could not be retrieved
        return null;
      }
    }),
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async jwt({ token, user }) {
      // Add user role to JWT token when available
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add role to the session
      if (session?.user && token?.role) {
        session.user.role = token.role as string;
      }
      
      // Add user ID from JWT token
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  secret: process.env.NEXTAUTH_SECRET || 'default-secret-key-change-in-production',
};

export default NextAuth(authOptions);
