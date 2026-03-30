import express from 'express';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Daily sales report
router.get('/sales/daily', async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const orders = await Order.find({
      orderTime: { $gte: startDate, $lte: endDate },
      status: 'delivered'
    }).populate('items.menuItem');
    
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    
    res.json({ date, totalSales, totalOrders, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Stock alerts
router.get('/stock', async (req, res) => {
  try {
    const lowStock = await Inventory.find({ $expr: { $lt: ['$quantity', '$minThreshold'] } });
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;