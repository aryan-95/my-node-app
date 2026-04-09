const express = require('express');
const app = express();

// 🔥 Dynamic values for CI/CD verification
const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "v1";
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();
const HOSTNAME = process.env.HOSTNAME || "unknown";

// 🏠 Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 CI/CD Pipeline App is Running!</h1>
        <p><b>Version:</b> ${VERSION}</p>
        <p><b>Build Time:</b> ${BUILD_TIME}</p>
        <p><b>Container:</b> ${HOSTNAME}</p>
    `);
});

// ❤️ Health Check (for Load Balancer / ECS)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        version: VERSION,
        time: new Date()
    });
});

// 🔍 Debug Route (VERY USEFUL)
app.get('/debug', (req, res) => {
    res.json({
        version: VERSION,
        buildTime: BUILD_TIME,
        hostname: HOSTNAME,
        env: process.env
    });
});

// 🔄 Change Detection Route
app.get('/change', (req, res) => {
    res.send(`🔥 New Deployment Detected! Version: ${VERSION}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});