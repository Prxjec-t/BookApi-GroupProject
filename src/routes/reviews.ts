import express from 'express'
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from '../controllers/reviewController'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

// Public endpoints - anyone can read reviews and post a new one.
router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', createReview)

// Protected endpoints - a valid token cookie is required to edit or delete.
router.patch('/:id', verifyToken, updateReview)
router.delete('/:id', verifyToken, deleteReview)

export default router
