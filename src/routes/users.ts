import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { fetchAllUsers, fetchUser, updateUser } from '../controllers/usersController';

const router = express.Router();

router.get('/', fetchAllUsers, verifyToken);
router.get('/:id', fetchUser, verifyToken);
router.patch('/:id', updateUser, verifyToken)

export default router;
