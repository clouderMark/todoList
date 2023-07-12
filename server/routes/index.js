import express from 'express';
import user from './user.js';
import todo from './todo.js';

const router = new express.Router();

router.use('/user', user);
router.use('/todo', todo);

export default router;
