import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isLoggedIn = await bcrypt.compare(password, user.password);
    if (!isLoggedIn) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET || '', { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ message: 'You are logged in', isLoggedIn: isLoggedIn, accessToken: accessToken });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Username/password are wrong' });
    return;
  }
};


export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await Users.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Users({ username: username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'You are registered' });
  } catch (error) {
    res.status(500).json({ message: 'Registration is unsuccessful' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.json({ message: 'You are logged out' });
};
