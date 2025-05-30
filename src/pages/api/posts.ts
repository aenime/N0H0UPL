import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  featuredImage?: string;
  slug: string;
}

interface PostsResponse {
  success: boolean;
  posts: any[];
  pagination?: {
    current: number;
    total: number;
    count: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse | { success: boolean; post?: any; error?: string }>
) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const { 
        page = 1, 
        limit = 10, 
        status = 'published',
        category,
        search,
        author 
      } = req.query;

      // Build query
      let query: any = {};
      
      if (status && status !== 'all') {
        query.status = status;
      }
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (author) {
        query.author = author;
      }
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
      
      // Get posts with pagination
      const posts = await db.collection('posts')
        .find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .toArray();

      const total = await db.collection('posts').countDocuments(query);
      const totalPages = Math.ceil(total / parseInt(limit as string));

      return res.status(200).json({
        success: true,
        posts: posts.map(post => ({
          ...post,
          _id: post._id.toString()
        })),
        pagination: {
          current: parseInt(page as string),
          total: totalPages,
          count: total
        }
      });

    } else if (req.method === 'POST') {
      const {
        title,
        content,
        excerpt,
        author,
        status = 'draft',
        tags = [],
        category,
        featuredImage,
        slug
      } = req.body;

      // Validate required fields
      if (!title || !content || !author || !slug) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: title, content, author, slug'
        });
      }

      // Check if slug already exists
      const existingPost = await db.collection('posts').findOne({ slug });
      if (existingPost) {
        return res.status(400).json({
          success: false,
          error: 'A post with this slug already exists'
        });
      }

      const now = new Date();
      const newPost = {
        title,
        content,
        excerpt,
        author,
        status,
        publishedAt: status === 'published' ? now : undefined,
        createdAt: now,
        updatedAt: now,
        tags: Array.isArray(tags) ? tags : [],
        category: category || 'general',
        featuredImage,
        slug
      };

      const result = await db.collection('posts').insertOne(newPost);
      
      if (result.insertedId) {
        const createdPost = await db.collection('posts').findOne({ _id: result.insertedId });
        if (createdPost) {
          return res.status(201).json({
            success: true,
            post: {
              ...createdPost,
              _id: createdPost._id.toString()
            }
          });
        }
      }
      
      return res.status(500).json({
        success: false,
        error: 'Failed to create post'
      });

    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Post ID is required'
        });
      }

      // If publishing, set publishedAt
      if (updateData.status === 'published' && !updateData.publishedAt) {
        updateData.publishedAt = new Date();
      }

      updateData.updatedAt = new Date();

      const result = await db.collection('posts').updateOne(
        { _id: new ObjectId(id as string) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Post not found'
        });
      }

      const updatedPost = await db.collection('posts').findOne({ _id: new ObjectId(id as string) });
      
      if (updatedPost) {
        return res.status(200).json({
          success: true,
          post: {
            ...updatedPost,
            _id: updatedPost._id.toString()
          }
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Failed to retrieve updated post'
        });
      }

    } else if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Post ID is required'
        });
      }

      const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id as string) });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Post not found'
        });
      }

      return res.status(200).json({
        success: true
      });

    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`
      });
    }

  } catch (error) {
    console.error('Posts API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
