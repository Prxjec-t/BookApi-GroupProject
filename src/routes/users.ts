import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { fetchAllUsers, fetchUser } from '../controllers/usersController';

const router = express.Router();

router.get('/', fetchAllUsers, verifyToken);
router.get('/:id', fetchUser, verifyToken);

export default router;
