import express from 'express';
import TodoController from '../controlers/Todo.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new express.Router();

router.post('/create', TodoController.create);
router.post('/getall', TodoController.getAll)

export default router;
