import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imagePath: string;
  category: string;
  publishDate: string;
  authorName: string;
  status: 'published' | 'draft';
  tags: string[];
  readTime: number;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
  };
  showOnHome?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  showOnHome: boolean;
  isActive: boolean;
  icon: string;
  order: number;
}

const CategoryPostsSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // In a real app, these would be API calls
      // For now, we'll use mock data that matches the admin components
      
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Success Stories',
          description: 'Inspiring stories of rescued animals and their recovery',
          color: '#10B981',
          showOnHome: true,
          isActive: true,
          icon: '🐕',
          order: 1
        },
        {
          id: '2',
          name: 'Medical Updates',
          description: 'Updates on medical treatments and procedures',
          color: '#EF4444',
          showOnHome: true,
          isActive: true,
          icon: '🏥',
          order: 2
        },
        {
          id: '3',
          name: 'Events',
          description: 'Community events and workshops',
          color: '#8B5CF6',
          showOnHome: true,
          isActive: true,
          icon: '📅',
          order: 3
        },
        {
          id: '4',
          name: 'Announcements',
          description: 'Important announcements and news',
          color: '#F59E0B',
          showOnHome: false, // This won't show on home
          isActive: true,
          icon: '📢',
          order: 4
        }
      ];

      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Charlie\'s Amazing Recovery Journey',
          content: 'Today we rescued a severely injured street dog from the highway...',
          excerpt: 'Emergency rescue and recovery story of Charlie, a street dog who found hope.',
          imagePath: '/images/animals/dog1.jpg',
          category: 'Success Stories',
          publishDate: '2025-05-28',
          authorName: 'Dr. Priya Sharma',
          status: 'published',
          tags: ['rescue', 'dogs', 'success'],
          readTime: 5,
          showOnHome: true,
          theme: {
            primaryColor: '#10B981',
            secondaryColor: '#D1FAE5',
            textColor: '#065F46',
            backgroundColor: '#F0FDF4'
          }
        },
        {
          id: '2',
          title: 'Successful Heart Surgery for Rescued Puppy',
          content: 'A complex heart surgery saved the life of a young puppy...',
          excerpt: 'Life-saving surgery gives new hope to a rescued puppy with heart condition.',
          imagePath: '/images/animals/dog2.jpg',
          category: 'Medical Updates',
          publishDate: '2025-05-27',
          authorName: 'Dr. Raj Kumar',
          status: 'published',
          tags: ['medical', 'surgery', 'puppy'],
          readTime: 4,
          showOnHome: true,
          theme: {
            primaryColor: '#EF4444',
            secondaryColor: '#FEE2E2',
            textColor: '#991B1B',
            backgroundColor: '#FEF2F2'
          }
        },
        {
          id: '3',
          title: 'Community Awareness Workshop Success',
          content: 'Our recent community workshop reached over 200 people...',
          excerpt: 'Educational program about animal welfare reaches local communities.',
          imagePath: '/images/humans/workshop.jpg',
          category: 'Events',
          publishDate: '2025-05-26',
          authorName: 'Volunteer Team',
          status: 'published',
          tags: ['education', 'community', 'awareness'],
          readTime: 3,
          showOnHome: true,
          theme: {
            primaryColor: '#8B5CF6',
            secondaryColor: '#EDE9FE',
            textColor: '#5B21B6',
            backgroundColor: '#FAF5FF'
          }
        },
        {
          id: '4',
          title: 'Bella Finds Her Forever Home',
          content: 'After months of recovery, Bella has found a loving family...',
          excerpt: 'A happy ending for Bella who overcame many challenges to find love.',
          imagePath: '/images/animals/cat1.jpg',
          category: 'Success Stories',
          publishDate: '2025-05-25',
          authorName: 'Adoption Team',
          status: 'published',
          tags: ['adoption', 'cats', 'success'],
          readTime: 4,
          showOnHome: true,
          theme: {
            primaryColor: '#10B981',
            secondaryColor: '#D1FAE5',
            textColor: '#065F46',
            backgroundColor: '#F0FDF4'
          }
        },
        {
          id: '5',
          title: 'New Medical Equipment Arrives',
          content: 'Thanks to donations, we received new medical equipment...',
          excerpt: 'New diagnostic equipment will help us provide better care.',
          imagePath: '/images/payment/medical-equipment.jpg',
          category: 'Medical Updates',
          publishDate: '2025-05-24',
          authorName: 'Dr. Priya Sharma',
          status: 'published',
          tags: ['equipment', 'medical', 'donations'],
          readTime: 3,
          showOnHome: true,
          theme: {
            primaryColor: '#EF4444',
            secondaryColor: '#FEE2E2',
            textColor: '#991B1B',
            backgroundColor: '#FEF2F2'
          }
        }
      ];

      setCategories(mockCategories);
      setPosts(mockPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getPostsForCategory = (categoryName: string) => {
    return posts
      .filter(post => 
        post.category === categoryName && 
        post.status === 'published' && 
        post.showOnHome
      )
      .slice(0, 4); // Max 4 posts per category
  };

  const visibleCategories = categories
    .filter(cat => cat.showOnHome && cat.isActive)
    .sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <p className="text-lg text-gray-600">Stay updated with our latest stories and achievements</p>
        </div>

        {visibleCategories.map((category) => {
          const categoryPosts = getPostsForCategory(category.name);
          
          if (categoryPosts.length === 0) return null;

          return (
            <div key={category.id} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 
                      className="text-2xl font-bold"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                <button 
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  onClick={() => {
                    // In a real app, this would navigate to category page
                    console.log(`View all ${category.name}`);
                  }}
                >
                  View All
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    style={{ 
                      borderTop: `4px solid ${post.theme?.primaryColor || category.color}` 
                    }}
                  >
                    {/* Post Image */}
                    <div className="h-48 bg-gray-200 relative">
                      {post.imagePath ? (
                        <Image
                          src={post.imagePath}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: post.theme?.secondaryColor || '#F3F4F6' }}
                        >
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 text-xs rounded"
                            style={{ 
                              backgroundColor: post.theme?.secondaryColor || '#F3F4F6',
                              color: post.theme?.textColor || '#374151'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryPostsSection;
