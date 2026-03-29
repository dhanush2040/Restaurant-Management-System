import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, required: true },
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered'], default: 'pending' },
  tableNumber: Number,
  orderTime: { type: Date, default: Date.now },
  specialInstructions: String
});

export default mongoose.model('Order', orderSchema);