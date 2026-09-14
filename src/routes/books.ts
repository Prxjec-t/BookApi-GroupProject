import express from 'express';
import { fetchAllBooks, createBook, updateBook } from '../controllers/bookController';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', fetchAllBooks);
router.post('/', verifyToken, createBook);
router.patch('/:id', verifyToken, updateBook);

export default router;