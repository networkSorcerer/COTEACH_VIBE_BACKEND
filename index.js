const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routers/todos');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo';

const app = express();

// CORS 미들웨어
app.use(cors());

// JSON 파싱 미들웨어
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Server is running with MongoDB.' });
});

// Todos 라우터
app.use('/todos', todosRouter);

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


