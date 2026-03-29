import express from 'express';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place new order
router.post('/', async (req, res) => {
  try {
    const { customerName, items, tableNumber, specialInstructions } = req.body;
    
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || !menuItem.available) {
        return res.status(400).json({ message: `Menu item ${item.menuItem} not available` });
      }
      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price * item.quantity
      });
      totalAmount += menuItem.price * item.quantity;
      
      // Auto-update inventory
      for (const ingredient of menuItem.ingredients) {
        const inventoryItem = await Inventory.findOne({ itemName: ingredient });
        if (inventoryItem) {
          inventoryItem.quantity -= item.quantity;
          await inventoryItem.save();
        }
      }
    }
    
    const order = new Order({
      customerName,
      items: orderItems,
      totalAmount,
      tableNumber,
      specialInstructions
    });
    
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.body.status) order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;