// Test script to verify payment settings synchronization
const fetch = require('node-fetch');

async function testPaymentSync() {
  const baseUrl = 'http://localhost:3002';
  
  console.log('🧪 Testing Payment Settings Synchronization...\n');
  
  try {
    // 1. Test initial state
    console.log('1️⃣ Testing initial payment settings...');
    const initialResponse = await fetch(`${baseUrl}/api/payment-settings`);
    const initialData = await initialResponse.json();
    console.log('Initial settings:', initialData.success ? 'Loaded' : 'Failed');
    
    // 2. Configure test payment methods
    console.log('\n2️⃣ Configuring test payment methods...');
    const testSettings = [
      {
        id: 'phonepe',
        name: 'PhonePe',
        icon: '📱',
        upiId: 'test-phonepe@hdfc',
        active: true,
        published: true
      },
      {
        id: 'googlepay',
        name: 'Google Pay',
        icon: '🟣',
        upiId: 'test-gpay@okaxis',
        active: true,
        published: true
      },
      {
        id: 'paytm',
        name: 'Paytm',
        icon: '🔵',
        upiId: '',
        active: false,
        published: false
      },
      {
        id: 'qr',
        name: 'QR Code',
        icon: '📋',
        upiId: 'test-qr@paytm',
        active: true,
        published: true
      }
    ];
    
    const saveResponse = await fetch(`${baseUrl}/api/payment-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethods: testSettings })
    });
    
    const saveResult = await saveResponse.json();
    console.log('Save result:', saveResult.success ? '✅ Success' : '❌ Failed');
    
    // 3. Test active payment methods endpoint
    console.log('\n3️⃣ Testing active payment methods API...');
    const activeResponse = await fetch(`${baseUrl}/api/active-payment-methods`);
    const activeData = await activeResponse.json();
    
    if (activeData.success) {
      console.log('✅ Active methods API working');
      console.log(`📊 Found ${activeData.count} active payment methods:`);
      activeData.data.forEach(method => {
        console.log(`   - ${method.name} (${method.id}): ${method.upiId}`);
      });
      
      // Validate filtering logic
      const expectedCount = testSettings.filter(m => 
        m.active && m.published && m.upiId.trim() !== ''
      ).length;
      
      if (activeData.count === expectedCount) {
        console.log('✅ Filtering logic is correct');
      } else {
        console.log(`❌ Filtering logic issue: expected ${expectedCount}, got ${activeData.count}`);
      }
    } else {
      console.log('❌ Active methods API failed');
    }
    
    // 4. Test persistence
    console.log('\n4️⃣ Testing persistence...');
    const reloadResponse = await fetch(`${baseUrl}/api/payment-settings`);
    const reloadData = await reloadResponse.json();
    
    if (reloadData.success) {
      const phonepeMethod = reloadData.data.find(m => m.id === 'phonepe');
      if (phonepeMethod && phonepeMethod.upiId === 'test-phonepe@hdfc') {
        console.log('✅ Settings persistence working');
      } else {
        console.log('❌ Settings not persisted correctly');
      }
    }
    
    console.log('\n🎉 Payment synchronization test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testPaymentSync();
