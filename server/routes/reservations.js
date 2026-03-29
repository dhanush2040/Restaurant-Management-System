import express from 'express';
import Reservation from '../models/Reservation.js';
import Table from '../models/Table.js';

const router = express.Router();

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('table');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check table availability
router.get('/availability', async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    const tables = await Table.find({ capacity: { $gte: guests }, status: 'available' });
    
    // Check existing reservations for the date and time
    const existingReservations = await Reservation.find({
      date: new Date(date),
      time: time,
      status: 'confirmed'
    }).populate('table');
    
    const reservedTableIds = existingReservations.map(res => res.table._id.toString());
    const availableTables = tables.filter(table => !reservedTableIds.includes(table._id.toString()));
    
    res.json(availableTables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create reservation
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, email, table, date, time, guests, specialRequests } = req.body;
    
    // Check if table is available
    const existingReservation = await Reservation.findOne({
      table,
      date: new Date(date),
      time,
      status: 'confirmed'
    });
    
    if (existingReservation) {
      return res.status(400).json({ message: 'Table not available at this time' });
    }
    
    const reservation = new Reservation({
      customerName,
      phone,
      email,
      table,
      date,
      time,
      guests,
      specialRequests
    });
    
    const newReservation = await reservation.save();
    
    // Update table status to reserved
    await Table.findByIdAndUpdate(table, { status: 'reserved' });
    
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel reservation
router.put('/:id/cancel', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    reservation.status = 'cancelled';
    await reservation.save();
    
    // Update table status back to available
    await Table.findByIdAndUpdate(reservation.table, { status: 'available' });
    
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;