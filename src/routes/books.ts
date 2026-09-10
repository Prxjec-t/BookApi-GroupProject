import express from 'express';
import { fetchAllBooks, createBook } from '../controllers/bookController';

const router = express.Router();

router.get('/', fetchAllBooks);
router.post('/', createBook);

export default router;