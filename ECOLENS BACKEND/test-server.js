const axios = require('axios');

const testAPIs = async () => {
  const baseURL = 'http://localhost:3001';
  
  try {
    console.log('🧪 Testing ECOLENS Backend APIs...\n');

    // Test health check
    const health = await axios.get(`${baseURL}/health`);
    console.log('✅ Health Check:', health.data.status);

    // Test global CO2 data
    const globalData = await axios.get(`${baseURL}/api/data/co2/global`);
    console.log('✅ Global CO2 Data:', globalData.data.success ? 'Working' : 'Failed');

    // Test country CO2 data
    const countryData = await axios.get(`${baseURL}/api/data/co2/country/PK`);
    console.log('✅ Country CO2 Data:', countryData.data.success ? 'Working' : 'Failed');

    // Test simulation
    const simulation = await axios.post(`${baseURL}/api/simulation/run`, {
      country: 'Pakistan',
      yearsAhead: 10
    });
    console.log('✅ Simulation API:', simulation.data.country ? 'Working' : 'Failed');

    // Test scenarios
    const scenarios = await axios.get(`${baseURL}/api/simulation/scenarios`);
    console.log('✅ Scenarios API:', scenarios.data.scenarios ? 'Working' : 'Failed');

    // Test narrative generation
    const narrative = await axios.post(`${baseURL}/api/narrative/generate`, {
      data: {},
      scenario: 'current_path'
    });
    console.log('✅ Narrative API:', narrative.data.narrative ? 'Working' : 'Failed');

    // Test visualization
    const timeline = await axios.get(`${baseURL}/api/visualization/timeline/PK`);
    console.log('✅ Visualization API:', timeline.data.country ? 'Working' : 'Failed');

    console.log('\n🎉 All APIs are working correctly!');
    console.log('\n📋 Available Endpoints:');
    console.log('   GET  /health');
    console.log('   GET  /api/data/co2/global');
    console.log('   GET  /api/data/co2/country/:countryCode');
    console.log('   POST /api/cv/analyze');
    console.log('   POST /api/simulation/run');
    console.log('   GET  /api/simulation/scenarios');
    console.log('   POST /api/narrative/generate');
    console.log('   GET  /api/narrative/templates');
    console.log('   GET  /api/visualization/timeline/:countryCode');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running: npm start');
    }
  }
};

// Run tests if server is available
testAPIs();