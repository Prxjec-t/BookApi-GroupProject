import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  published_year: {
    type: Number,
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

BookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book_id'
});

export default mongoose.model('books', BookSchema);