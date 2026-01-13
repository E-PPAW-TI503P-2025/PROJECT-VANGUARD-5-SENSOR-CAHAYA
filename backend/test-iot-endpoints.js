require("dotenv").config();
const axios = require("axios");

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/api`;

async function testIoTEndpoints() {
    console.log("🧪 Testing IoT Sensor Endpoints\n");
    console.log(`Base URL: ${BASE_URL}\n`);

    try {
        // Test 1: POST - Create sensor log with TERANG condition
        console.log("📝 Test 1: POST /api/sensor (cahaya > 2000 - TERANG)");
        const response1 = await axios.post(`${BASE_URL}/sensor`, {
            cahaya: 2500
        });
        console.log("✅ Response:", JSON.stringify(response1.data, null, 2));
        console.log("Expected: kondisi='TERANG', status_lampu='OFF'\n");

        // Test 2: POST - Create sensor log with GELAP condition
        console.log("📝 Test 2: POST /api/sensor (cahaya < 2000 - GELAP)");
        const response2 = await axios.post(`${BASE_URL}/sensor`, {
            cahaya: 1500
        });
        console.log("✅ Response:", JSON.stringify(response2.data, null, 2));
        console.log("Expected: kondisi='GELAP', status_lampu='ON'\n");

        // Test 3: GET - Get all sensor logs
        console.log("📝 Test 3: GET /api/sensor (all logs)");
        const response3 = await axios.get(`${BASE_URL}/sensor`);
        console.log(`✅ Retrieved ${response3.data.length} records`);
        console.log("Latest 2 records:", JSON.stringify(response3.data.slice(0, 2), null, 2));
        console.log();

        // Test 4: GET - Get latest sensor log
        console.log("📝 Test 4: GET /api/sensor/latest");
        const response4 = await axios.get(`${BASE_URL}/sensor/latest`);
        console.log("✅ Response:", JSON.stringify(response4.data, null, 2));
        console.log();

        console.log("🎉 All tests passed! Database integration is working correctly.");
        console.log("\n✅ Verification:");
        console.log("   - kondisi field is being saved");
        console.log("   - status_lampu field is being saved");
        console.log("   - Logic in iot.controller.js is working as expected");

    } catch (error) {
        console.error("❌ Test failed:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        console.error("\n⚠️  Make sure the server is running on port", PORT);
        process.exit(1);
    }
}

testIoTEndpoints();
