const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Leendet API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Leendet server running on http://${HOST}:${PORT}`);
});
