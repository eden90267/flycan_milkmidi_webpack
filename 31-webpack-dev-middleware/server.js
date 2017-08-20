const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/api', (req, res) => {
  res.json({ status: 'ok' });
});
app.listen(8080, '127.0.0.1', () => {
  console.log('http://localhost:8080');
});

if (process.env.NODE_ENV === 'development') {
  require('./server.dev')(app);
} else {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}
