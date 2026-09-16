import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { deleteUser, fetchAllUsers, fetchUser, updateUser } from '../controllers/usersController';

const router = express.Router();

router.get('/', verifyToken, fetchAllUsers);
router.get('/:id', verifyToken, fetchUser);
router.patch('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router;
