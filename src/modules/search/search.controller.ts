import { Request, Response } from 'express';
import { searchUsers, searchGroups } from './search.services';

export const search = async (req: Request, res: Response) => {
  const { name, type } = req.query;

  if (!name || !type) {
    return res.status(400).json({ message: 'Missing name or type' });
  }

  try {
    if (type === 'user') {
      const users = await searchUsers(name as string);
      return res.json(users);
    } else if (type === 'group') {
      const groups = await searchGroups(name as string);
      return res.json(groups);
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }
  } catch (error) {
    console.error('Error searching:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
