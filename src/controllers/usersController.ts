import { Request, Response } from 'express';
import Users from '../models/Users';

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find().select('-password');
    res.json(users);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching all users' });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const user = await Users.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Unknown error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string
  const {username, password} = req.body
  if (username === undefined && password === undefined) {
    res.status(400).json({error: 'Username is required'})
    return
  }

  try {
    const updateFields: Partial<{ username: string, password: string}> = {}
    if (username !== undefined) updateFields.username = username
    if (password !== undefined) updateFields.password = password

    const result = await Users.updateOne(
      {_id: id},
      {$set: updateFields}
    )

    if (result.matchedCount === 0) {
      res.status(404).json({message: 'User not found'})
      return
    }

    res.json({message: 'User successfully updated!'})

  } catch (error: unknown) {
    res.status(500).json({message: 'Unknown error'})
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string

  try {
    const result = await Users.deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      res.status(404).json({message: 'User not found'})
      return
    }

    res.json({message: 'User deleted', result: result})
  } catch (error: unknown) {
    res.status(500).json({message: 'Unknown error'})
  }
}