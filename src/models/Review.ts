import mongoose from 'mongoose'

// Ansvarsområde 3 - the "reviews" collection.
// Each review belongs to one book via book_id (an ObjectId reference to the
// Book collection). The rating is limited to 1-5 by the schema itself, so an
// invalid value is rejected before it ever reaches the database.
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }, // 1-5
  created_at: { type: Date, default: Date.now },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
