import { Request, Response } from "express"
import Review from "../models/Review"

// GET /api/reviews
// Returns every review. If a ?book_id=... query is supplied we return only the
// reviews for that book - the specific-book page in the client uses this to
// list the reviews that belong to the book being viewed.
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const filter = req.query.book_id ? { book_id: req.query.book_id } : {}
        const reviews = await Review.find(filter).sort({ created_at: -1 })
        res.json(reviews)
    } catch (e) {
        res.status(500).json({ message: "Could not fetch reviews" })
    }
}

// GET /api/reviews/:id
// Returns a single review, or 404 if the id does not match any review.
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const review = await Review.findById(req.params.id)
        if (review === null) {
            res.status(404).json({ message: "Review not found" })
            return
        }
        res.json(review)
    } catch (e) {
        // A malformed ObjectId throws a CastError - treat it as "not found".
        res.status(404).json({ message: "Review not found" })
    }
}

// POST /api/reviews
// Creates a new review. name, content, rating and book_id are all required.
// The rating range (1-5) is enforced by the schema, so an out-of-range value
// is caught by the validation error below.
export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating, book_id } = req.body
    if (name === undefined || content === undefined || rating === undefined || book_id === undefined) {
        res.status(400).json({ message: "name, content, rating and book_id are required" })
        return
    }

    try {
        const review = await Review.create({ name, content, rating, book_id })
        res.status(201).json(review)
    } catch (e) {
        // Validation errors (e.g. rating outside 1-5, bad book_id) land here.
        res.status(400).json({ message: "Could not create review", error: (e as Error).message })
    }
}

// PATCH /api/reviews/:id  (Token)
// Updates the supplied fields of an existing review and returns the new version.
export const updateReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (review === null) {
            res.status(404).json({ message: "Review not found" })
            return
        }
        res.json(review)
    } catch (e) {
        res.status(400).json({ message: "Could not update review", error: (e as Error).message })
    }
}

// DELETE /api/reviews/:id  (Token)
// Removes a review by id.
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (review === null) {
            res.status(404).json({ message: "Review not found" })
            return
        }
        res.json({ message: "Review deleted" })
    } catch (e) {
        res.status(404).json({ message: "Review not found" })
    }
}
