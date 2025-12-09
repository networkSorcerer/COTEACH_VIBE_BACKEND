const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// 모든 할일 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다.' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: '제목은 필수입니다.' });
    }

    const todo = new Todo({
      title,
      description: description || ''
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다.' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다.' });
    }

    res.json({ message: '할일이 삭제되었습니다.', todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

