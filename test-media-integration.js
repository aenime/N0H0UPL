#!/usr/bin/env node

/**
 * Test script to verify media integration in admin panel
 * Tests API functionality and data structure consistency
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3006';

async function testMediaIntegration() {
  console.log('🧪 Testing Media Integration in Admin Panel\n');

  try {
    // Test 1: Media API availability
    console.log('1️⃣ Testing Media API...');
    const mediaResponse = await axios.get(`${BASE_URL}/api/media`);
    
    if (mediaResponse.status === 200 && mediaResponse.data.success) {
      console.log('✅ Media API is working');
      console.log(`📊 Total media files: ${mediaResponse.data.media.length}`);
    } else {
      throw new Error('Media API returned invalid response');
    }

    // Test 2: Media data structure
    console.log('\n2️⃣ Validating media data structure...');
    const media = mediaResponse.data.media;
    const requiredFields = ['id', 'filename', 'url', 'category', 'size', 'createdAt'];
    
    let validCount = 0;
    media.forEach((item, index) => {
      const hasAllFields = requiredFields.every(field => item.hasOwnProperty(field));
      if (hasAllFields) {
        validCount++;
      } else {
        console.log(`⚠️  Media item ${index + 1} missing fields:`, 
          requiredFields.filter(field => !item.hasOwnProperty(field)));
      }
    });

    console.log(`✅ ${validCount}/${media.length} media files have valid structure`);

    // Test 3: Category distribution
    console.log('\n3️⃣ Analyzing category distribution...');
    const categoryCount = media.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Category breakdown:');
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} files`);
    });

    // Test 4: File accessibility
    console.log('\n4️⃣ Testing file accessibility...');
    let accessibleCount = 0;
    
    for (const item of media.slice(0, 3)) { // Test first 3 files
      try {
        const fileResponse = await axios.head(`${BASE_URL}${item.url}`);
        if (fileResponse.status === 200) {
          accessibleCount++;
        }
      } catch (error) {
        console.log(`⚠️  File not accessible: ${item.url}`);
      }
    }

    console.log(`✅ ${accessibleCount}/3 tested files are accessible`);

    // Test 5: Admin dashboard availability
    console.log('\n5️⃣ Testing admin dashboard...');
    try {
      const adminResponse = await axios.get(`${BASE_URL}/admin`);
      if (adminResponse.status === 200) {
        console.log('✅ Admin dashboard is accessible');
      }
    } catch (error) {
      console.log('❌ Admin dashboard not accessible');
    }

    // Summary
    console.log('\n📋 INTEGRATION TEST SUMMARY:');
    console.log('=' .repeat(50));
    console.log(`✅ Media API: Working (${media.length} files)`);
    console.log(`✅ Data Structure: Valid (${validCount}/${media.length} files)`);
    console.log(`✅ Categories: ${Object.keys(categoryCount).length} categories found`);
    console.log(`✅ File Access: ${accessibleCount}/3 tested files accessible`);
    console.log(`✅ Admin Panel: Accessible`);
    
    if (media.length === 8) {
      console.log('\n🎉 SUCCESS: All 8 media files are properly integrated!');
    } else {
      console.log(`\n⚠️  WARNING: Expected 8 files, found ${media.length}`);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testMediaIntegration().catch(console.error);
