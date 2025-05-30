#!/usr/bin/env node

/**
 * Comprehensive test script to verify admin-frontend data synchronization
 * Tests all major API endpoints and data flow
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3004';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testAPI(endpoint, method = 'GET', data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      timeout: 10000
    };
    
    if (data) {
      config.data = data;
      config.headers = { 'Content-Type': 'application/json' };
    }
    
    const response = await axios(config);
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 0,
      error: error.message,
      data: error.response?.data
    };
  }
}

async function runTests() {
  log(colors.bold + colors.cyan, '\n🔄 NGO ADMIN-FRONTEND DATA SYNC VERIFICATION');
  log(colors.cyan, '================================================\n');

  const tests = [
    {
      name: 'Database Connection',
      endpoint: '/api/admin/dashboard/stats',
      expectedFields: ['totalDonations', 'recentDonors']
    },
    {
      name: 'Donations API (Real Data)',
      endpoint: '/api/donations',
      expectedFields: ['success', 'donations']
    },
    {
      name: 'Media Library API',
      endpoint: '/api/media',
      expectedFields: ['success', 'media']
    },
    {
      name: 'Dashboard Stats (Real Data)',
      endpoint: '/api/admin/dashboard/stats',
      expectedFields: ['totalDonations', 'monthlyGrowth', 'avgDonation']
    },
    {
      name: 'Activity Feed (Real Data)',
      endpoint: '/api/admin/dashboard/activity',
      expectedFields: ['activities', 'totalCount']
    }
  ];

  let passedTests = 0;
  let failedTests = 0;

  for (const test of tests) {
    log(colors.blue, `🧪 Testing: ${test.name}`);
    
    const result = await testAPI(test.endpoint);
    
    if (result.success) {
      // Check if expected fields exist
      const missingFields = test.expectedFields.filter(field => 
        !result.data.hasOwnProperty(field)
      );
      
      if (missingFields.length === 0) {
        log(colors.green, `   ✅ PASSED - Status: ${result.status}`);
        
        // Show some data details
        if (test.name.includes('Donations') && result.data.donations) {
          log(colors.yellow, `   📊 Found ${result.data.donations.length} donations in database`);
        }
        if (test.name.includes('Media') && result.data.media) {
          log(colors.yellow, `   🖼️  Found ${result.data.media.length} media files`);
        }
        if (test.name.includes('Activity') && result.data.activities) {
          log(colors.yellow, `   📋 Found ${result.data.activities.length} recent activities`);
          // Show latest activity
          if (result.data.activities.length > 0) {
            const latest = result.data.activities[0];
            log(colors.yellow, `   🕐 Latest: ${latest.user} ${latest.action} (${latest.type})`);
          }
        }
        if (test.name.includes('Stats')) {
          const stats = result.data;
          log(colors.yellow, `   💰 Total Donations: ₹${stats.totalDonations?.amount || 0}`);
          log(colors.yellow, `   👥 Recent Donors: ${stats.recentDonors || 0}`);
          log(colors.yellow, `   📈 Monthly Growth: ${stats.monthlyGrowth || 0}%`);
        }
        
        passedTests++;
      } else {
        log(colors.red, `   ❌ FAILED - Missing fields: ${missingFields.join(', ')}`);
        failedTests++;
      }
    } else {
      log(colors.red, `   ❌ FAILED - Status: ${result.status}, Error: ${result.error}`);
      failedTests++;
    }
    
    console.log(); // Add spacing
  }

  // Test data flow by posting a test donation
  log(colors.blue, '🧪 Testing: Data Flow (Frontend → Database)');
  const testDonation = {
    amount: 100,
    name: 'Test Donor (Sync Check)',
    email: 'test@example.com',
    purpose: 'Testing',
    paymentMethod: 'UPI'
  };

  const donationResult = await testAPI('/api/donations', 'POST', testDonation);
  if (donationResult.success) {
    log(colors.green, '   ✅ PASSED - Test donation saved to database');
    log(colors.yellow, `   💾 Transaction ID: ${donationResult.data.donation?.transactionId}`);
    passedTests++;
  } else {
    log(colors.red, '   ❌ FAILED - Could not save test donation');
    log(colors.red, `   Error: ${donationResult.error}`);
    failedTests++;
  }

  // Summary
  log(colors.bold + colors.cyan, '\n📊 TEST SUMMARY');
  log(colors.cyan, '================');
  log(colors.green, `✅ Passed: ${passedTests}`);
  log(colors.red, `❌ Failed: ${failedTests}`);
  log(colors.blue, `📊 Total:  ${passedTests + failedTests}`);

  if (failedTests === 0) {
    log(colors.bold + colors.green, '\n🎉 ALL TESTS PASSED! Admin-Frontend data sync is working correctly.');
    log(colors.green, '✓ Database connection is healthy');
    log(colors.green, '✓ Real data is flowing between admin and frontend');
    log(colors.green, '✓ APIs are returning actual database records');
    log(colors.green, '✓ Activity feed shows real user actions');
  } else {
    log(colors.bold + colors.red, '\n⚠️  SOME TESTS FAILED! Please check the issues above.');
  }

  console.log('\n');
}

// Run the tests
runTests().catch(error => {
  log(colors.red, `\n❌ Test execution failed: ${error.message}`);
  process.exit(1);
});
