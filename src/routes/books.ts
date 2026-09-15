import express from 'express';
import { fetchAllBooks, createBook, updateBook, deleteBook } from '../controllers/bookController';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', fetchAllBooks);
router.post('/', verifyToken, createBook);
router.patch('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

export default router;