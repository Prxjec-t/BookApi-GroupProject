import express from 'express';
import { fetchAllBooks } from '../controllers/bookController';

const router = express.Router();

router.get('/', fetchAllBooks);

export default router;