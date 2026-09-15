import Book from '../models/Book';

export const fetchAllBooks = async (req: any, res: any) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

export const createBook = async (req: any, res: any) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
};

export const updateBook = async (req: any, res: any) => {

  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(book);

  } catch (error) {

    res.status(500).json({ message: 'Error updating book' });

  }

};

export const deleteBook = async (req: any, res: any) => {

  try {

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: 'Book deleted' });

  } catch (error) {

    res.status(500).json({ message: 'Error deleting book' });

  }

};