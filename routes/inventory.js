import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new inventory item
router.post('/', async (req, res) => {
  const inventoryItem = new Inventory(req.body);
  try {
    const newItem = await inventoryItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (req.body.quantity !== undefined) item.quantity = req.body.quantity;
    if (req.body.minThreshold !== undefined) item.minThreshold = req.body.minThreshold;
    item.lastUpdated = new Date();
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get low stock alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Inventory.find({ $expr: { $lt: ['$quantity', '$minThreshold'] } });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;