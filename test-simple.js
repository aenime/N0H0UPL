// Simple test to verify API endpoints are working
async function testEndpoints() {
  console.log('🧪 Testing Payment Settings API...\n');
  
  try {
    // Test using curl commands
    console.log('Testing payment-settings endpoint...');
    
    // Check if server is responding
    const response = await fetch('http://localhost:3002/api/payment-settings');
    console.log('Server response status:', response.status);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testEndpoints();
