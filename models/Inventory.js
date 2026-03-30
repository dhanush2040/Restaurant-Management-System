import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'pieces' },
  minThreshold: { type: Number, default: 10 },
  supplier: String,
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Inventory', inventorySchema);