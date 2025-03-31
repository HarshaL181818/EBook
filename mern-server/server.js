const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const FRONTEND_PORT = 8080;  // Public Server Port
const LOCAL_API = "http://localhost:5000";  // API runs locally
const PUBLIC_IP = "http://52.200.115.42:8080";  // Public Server URL

const proxy = httpProxy.createProxyServer();

// Serve frontend files
app.use(express.static(path.join(__dirname, '../mern-client/dist')));

// Proxy API requests to `index.js`
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: LOCAL_API });
});

// Serve frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../mern-client/dist', 'index.html'));
});

// Start API server (index.js) if not already running
exec('node index.js', (err, stdout, stderr) => {
  if (err) console.error(`Error starting API: ${err}`);
  if (stdout) console.log(`API Output: ${stdout}`);
  if (stderr) console.error(`API Error: ${stderr}`);
});

// Start Frontend & Proxy Server
app.listen(FRONTEND_PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend & API Proxy Server running at ${PUBLIC_IP}`);
});
