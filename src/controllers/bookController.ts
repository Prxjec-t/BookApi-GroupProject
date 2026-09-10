import Book from '../models/Book';

export const fetchAllBooks = async (req: any, res: any) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};