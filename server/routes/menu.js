import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new menu item
router.post('/', async (req, res) => {
  const menuItem = new MenuItem(req.body);
  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;