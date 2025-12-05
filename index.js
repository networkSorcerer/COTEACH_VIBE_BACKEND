const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo';

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Server is running with MongoDB.' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB 연결 성공');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB 연결 실패:', err.message);
    process.exit(1);
  }
}

start();


