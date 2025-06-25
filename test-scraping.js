// Test script for the scraping utilities
// Run with: node test-scraping.js

const { scrapeImages } = require('./lib/utils/scrapeUtils');
const { downloadImage } = require('./lib/utils/imageUtils');

async function testScraping() {
  console.log('🔍 Testing scraping utilities...\n');

  try {
    // Test scraping from a simple website
    console.log('📄 Scraping images from example.com...');
    
    const result = await scrapeImages('https://example.com', {
      maxImages: 5,
      minWidth: 50,
      minHeight: 50,
      downloadImages: false, // Don't download for test
      timeout: 10000
    });

    console.log('✅ Scraping completed!');
    console.log('📊 Results:');
    console.log(`   - Total images found: ${result.images.length}`);
    console.log(`   - Page title: ${result.metadata.title || 'No title'}`);
    console.log(`   - Scraped at: ${result.metadata.scrapedAt}`);
    
    if (result.images.length > 0) {
      console.log('\n📷 Sample images:');
      result.images.slice(0, 3).forEach((img, index) => {
        console.log(`   ${index + 1}. ${img.url}`);
        if (img.alt) console.log(`      Alt: ${img.alt}`);
      });
    }

    // Test image utilities
    console.log('\n🖼️  Testing image utilities...');
    
    const testUrl = 'https://via.placeholder.com/300x200.png';
    console.log(`🔗 Testing download from: ${testUrl}`);
    
    const downloadResult = await downloadImage(testUrl, './public/uploads', 'test-image.png');
    
    if (downloadResult.success) {
      console.log('✅ Image download successful!');
      console.log(`   - Saved to: ${downloadResult.localPath}`);
      console.log(`   - Filename: ${downloadResult.filename}`);
    } else {
      console.log('❌ Image download failed:', downloadResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testScraping().then(() => {
  console.log('\n✨ Test completed!');
}).catch(error => {
  console.error('💥 Test error:', error);
});
