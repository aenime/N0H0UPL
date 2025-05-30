#!/usr/bin/env node

/**
 * Final Admin Panel Integration Test
 * Tests all completed APIs to verify admin panel synchronization
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';

// Test endpoints
const endpoints = {
  dashboard_stats: `${BASE_URL}/api/admin/dashboard/stats`,
  dashboard_activity: `${BASE_URL}/api/admin/dashboard/activity`,
  media: `${BASE_URL}/api/media`,
  posts: `${BASE_URL}/api/posts`,
  donations: `${BASE_URL}/api/donations`
};

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
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}🔍 ${msg}${colors.reset}`)
};

async function testEndpoint(name, url, expectedFields = []) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    
    if (response.status === 200) {
      const data = response.data;
      log.success(`${name} API working (${response.status})`);
      
      // Check expected fields
      if (expectedFields.length > 0) {
        const hasAllFields = expectedFields.every(field => data.hasOwnProperty(field));
        if (hasAllFields) {
          log.info(`✓ All expected fields present: ${expectedFields.join(', ')}`);
        } else {
          log.warning(`✗ Missing fields. Expected: ${expectedFields.join(', ')}, Got: ${Object.keys(data).join(', ')}`);
        }
      }
      
      // Log summary data
      if (name === 'Dashboard Stats' && data.success) {
        log.info(`📊 Stats: ${data.stats.totalDonations} donations, ₹${data.stats.totalAmount}`);
      } else if (name === 'Dashboard Activity' && data.success) {
        log.info(`📈 Activities: ${data.activities.length} recent activities`);
      } else if (name === 'Media' && data.success) {
        log.info(`🖼️  Media: ${data.media.length} files, ${data.pagination.count} total`);
      } else if (name === 'Posts' && data.success) {
        log.info(`📝 Posts: ${data.posts.length} posts found`);
      } else if (name === 'Donations' && data.success) {
        log.info(`💰 Donations: ${data.donations.length} donation records`);
      }
      
      return true;
    } else {
      log.error(`${name} API returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log.error(`${name} API connection refused - development server not running`);
    } else if (error.response && error.response.status === 404) {
      log.warning(`${name} API endpoint not found (404)`);
    } else {
      log.error(`${name} API error: ${error.message}`);
    }
    return false;
  }
}

async function runComprehensiveTest() {
  console.log(`${colors.bold}${colors.blue}🎯 NGO Admin Panel - Final Integration Test${colors.reset}`);
  console.log(`${colors.blue}Testing all API endpoints for admin panel synchronization${colors.reset}\n`);
  
  const results = {};
  
  // Test each endpoint
  log.title('Testing Dashboard APIs');
  results.dashboardStats = await testEndpoint('Dashboard Stats', endpoints.dashboard_stats, ['success', 'stats']);
  results.dashboardActivity = await testEndpoint('Dashboard Activity', endpoints.dashboard_activity, ['success', 'activities']);
  
  log.title('Testing Content APIs');
  results.media = await testEndpoint('Media', endpoints.media, ['success', 'media']);
  results.posts = await testEndpoint('Posts', endpoints.posts, ['success', 'posts']);
  
  log.title('Testing Data APIs');
  results.donations = await testEndpoint('Donations', endpoints.donations, ['success', 'donations']);
  
  // Summary
  console.log(`\n${colors.bold}${colors.blue}📋 INTEGRATION TEST SUMMARY${colors.reset}\n`);
  
  const workingApis = Object.entries(results).filter(([, working]) => working);
  const failedApis = Object.entries(results).filter(([, working]) => !working);
  
  workingApis.forEach(([api]) => {
    log.success(`${api} API: WORKING`);
  });
  
  failedApis.forEach(([api]) => {
    log.error(`${api} API: FAILED`);
  });
  
  console.log(`\n${colors.bold}Status: ${workingApis.length}/${Object.keys(results).length} APIs working${colors.reset}`);
  
  if (workingApis.length === Object.keys(results).length) {
    console.log(`${colors.green}${colors.bold}🎉 ALL APIS WORKING! Admin panel fully synchronized.${colors.reset}`);
  } else if (workingApis.length > 0) {
    console.log(`${colors.yellow}${colors.bold}⚠️  PARTIAL SUCCESS: Some APIs working, check failed ones.${colors.reset}`);
  } else {
    console.log(`${colors.red}${colors.bold}❌ NO APIS WORKING: Development server may not be running.${colors.reset}`);
  }
  
  console.log(`\n${colors.blue}💡 To start the development server: npm run dev${colors.reset}\n`);
}

// Run the comprehensive test
runComprehensiveTest().catch(error => {
  log.error(`Test suite failed: ${error.message}`);
  process.exit(1);
});
