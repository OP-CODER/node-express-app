const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Node.js Express app!');
});

app.get('/about', (req, res) => {
  res.send('This is a sample Node.js Express application.');
});

app.get('/status', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/data', (req, res) => {
  res.json([
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' }
  ]);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = app;
