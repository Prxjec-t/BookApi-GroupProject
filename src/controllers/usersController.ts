import { Request, Response } from 'express';
import Users from '../models/Users';

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all users' });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unknown error' });
  }
};
