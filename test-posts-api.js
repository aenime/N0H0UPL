#!/usr/bin/env node

/**
 * Test Posts API - Comprehensive Testing
 * Tests all CRUD operations for the blog posts API
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = `${BASE_URL}/api/posts`;

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}🔍 ${msg}${colors.reset}\n`)
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testGetPosts() {
  log.title('Testing GET /api/posts');
  
  try {
    const response = await axios.get(API_ENDPOINT);
    
    if (response.status === 200) {
      const data = response.data;
      log.success(`GET request successful (${response.status})`);
      log.info(`Response structure: ${JSON.stringify(Object.keys(data), null, 2)}`);
      
      if (data.success && Array.isArray(data.posts)) {
        log.success(`Found ${data.posts.length} posts`);
        
        if (data.posts.length > 0) {
          const post = data.posts[0];
          log.info(`Sample post: "${post.title}" by ${post.author}`);
          log.info(`Post fields: ${JSON.stringify(Object.keys(post), null, 2)}`);
        }
        
        if (data.pagination) {
          log.info(`Pagination: page ${data.pagination.current} of ${data.pagination.total} (${data.pagination.count} total posts)`);
        }
      } else {
        log.warning('Response structure unexpected');
      }
    } else {
      log.error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    log.error(`GET request failed: ${error.message}`);
    if (error.response) {
      log.error(`Response status: ${error.response.status}`);
      log.error(`Response data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

async function testCreatePost() {
  log.title('Testing POST /api/posts (Create)');
  
  const testPost = {
    title: 'Test Blog Post',
    content: 'This is a test blog post created by the API testing script. It contains sample content to verify the posts API is working correctly.',
    excerpt: 'A test blog post created by API testing script',
    author: 'API Test Script',
    status: 'draft',
    tags: ['test', 'api', 'blog'],
    category: 'testing',
    slug: 'test-blog-post-api-' + Date.now()
  };
  
  try {
    const response = await axios.post(API_ENDPOINT, testPost);
    
    if (response.status === 201) {
      const data = response.data;
      log.success(`POST request successful (${response.status})`);
      
      if (data.success && data.post) {
        log.success(`Post created successfully with ID: ${data.post._id}`);
        log.info(`Created post: "${data.post.title}"`);
        return data.post._id; // Return the ID for subsequent tests
      } else {
        log.warning('Response structure unexpected for POST');
      }
    } else {
      log.error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    log.error(`POST request failed: ${error.message}`);
    if (error.response) {
      log.error(`Response status: ${error.response.status}`);
      log.error(`Response data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
  
  return null;
}

async function testUpdatePost(postId) {
  if (!postId) {
    log.warning('Skipping PUT test - no post ID available');
    return;
  }
  
  log.title('Testing PUT /api/posts (Update)');
  
  const updateData = {
    title: 'Updated Test Blog Post',
    content: 'This is an updated test blog post. The content has been modified to test the PUT endpoint.',
    status: 'published',
    tags: ['test', 'api', 'blog', 'updated']
  };
  
  try {
    const response = await axios.put(`${API_ENDPOINT}?id=${postId}`, updateData);
    
    if (response.status === 200) {
      const data = response.data;
      log.success(`PUT request successful (${response.status})`);
      
      if (data.success && data.post) {
        log.success(`Post updated successfully`);
        log.info(`Updated post title: "${data.post.title}"`);
        log.info(`Updated status: ${data.post.status}`);
      } else {
        log.warning('Response structure unexpected for PUT');
      }
    } else {
      log.error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    log.error(`PUT request failed: ${error.message}`);
    if (error.response) {
      log.error(`Response status: ${error.response.status}`);
      log.error(`Response data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

async function testDeletePost(postId) {
  if (!postId) {
    log.warning('Skipping DELETE test - no post ID available');
    return;
  }
  
  log.title('Testing DELETE /api/posts (Delete)');
  
  try {
    const response = await axios.delete(`${API_ENDPOINT}?id=${postId}`);
    
    if (response.status === 200) {
      const data = response.data;
      log.success(`DELETE request successful (${response.status})`);
      
      if (data.success) {
        log.success('Post deleted successfully');
      } else {
        log.warning('Response structure unexpected for DELETE');
      }
    } else {
      log.error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    log.error(`DELETE request failed: ${error.message}`);
    if (error.response) {
      log.error(`Response status: ${error.response.status}`);
      log.error(`Response data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

async function testFilteredRequests() {
  log.title('Testing Filtered GET Requests');
  
  // Test different query parameters
  const testQueries = [
    { description: 'Published posts only', params: '?status=published' },
    { description: 'Draft posts only', params: '?status=draft' },
    { description: 'With pagination', params: '?page=1&limit=5' },
    { description: 'Search functionality', params: '?search=test' },
    { description: 'Filter by category', params: '?category=testing' }
  ];
  
  for (const test of testQueries) {
    try {
      log.info(`Testing: ${test.description}`);
      const response = await axios.get(`${API_ENDPOINT}${test.params}`);
      
      if (response.status === 200) {
        const data = response.data;
        log.success(`✓ ${test.description} - ${data.posts.length} posts found`);
      } else {
        log.warning(`? ${test.description} - unexpected status: ${response.status}`);
      }
    } catch (error) {
      log.error(`✗ ${test.description} - error: ${error.message}`);
    }
    
    await delay(100); // Small delay between requests
  }
}

async function runAllTests() {
  console.log(`${colors.bold}${colors.blue}🧪 Posts API Comprehensive Test Suite${colors.reset}`);
  console.log(`${colors.blue}Testing endpoint: ${API_ENDPOINT}${colors.reset}\n`);
  
  // Basic GET test
  await testGetPosts();
  await delay(500);
  
  // Create a test post
  const postId = await testCreatePost();
  await delay(500);
  
  // Update the post if created successfully
  if (postId) {
    await testUpdatePost(postId);
    await delay(500);
  }
  
  // Test filtered requests
  await testFilteredRequests();
  await delay(500);
  
  // Clean up - delete the test post
  if (postId) {
    await testDeletePost(postId);
  }
  
  console.log(`\n${colors.bold}${colors.green}✅ All Posts API tests completed!${colors.reset}`);
  console.log(`${colors.blue}Check the output above for detailed results.${colors.reset}\n`);
}

// Run the tests
runAllTests().catch(error => {
  log.error(`Test suite failed: ${error.message}`);
  process.exit(1);
});
