import mongoose from 'mongoose';
import MenuItem from './models/MenuItem.js';
import Table from './models/Table.js';
import Inventory from './models/Inventory.js';

const seedData = async () => {
  try {
    // Clear existing data
    await MenuItem.deleteMany({});
    await Table.deleteMany({});
    await Inventory.deleteMany({});

    // Seed menu items
    const menuItems = [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 12.99,
        category: 'Pizza',
        ingredients: ['dough', 'tomato sauce', 'mozzarella', 'basil']
      },
      {
        name: 'Chicken Burger',
        description: 'Grilled chicken burger with lettuce and tomato',
        price: 9.99,
        category: 'Burgers',
        ingredients: ['chicken patty', 'bun', 'lettuce', 'tomato']
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing and croutons',
        price: 7.99,
        category: 'Salads',
        ingredients: ['lettuce', 'croutons', 'parmesan', 'caesar dressing']
      }
    ];

    await MenuItem.insertMany(menuItems);

    // Seed tables
    const tables = [
      { number: 1, capacity: 2, status: 'available', location: 'Window' },
      { number: 2, capacity: 4, status: 'available', location: 'Center' },
      { number: 3, capacity: 6, status: 'available', location: 'Patio' },
      { number: 4, capacity: 2, status: 'available', location: 'Bar' }
    ];

    await Table.insertMany(tables);

    // Seed inventory
    const inventory = [
      { itemName: 'dough', quantity: 50, unit: 'pieces', minThreshold: 10 },
      { itemName: 'tomato sauce', quantity: 30, unit: 'bottles', minThreshold: 5 },
      { itemName: 'mozzarella', quantity: 20, unit: 'lbs', minThreshold: 5 },
      { itemName: 'basil', quantity: 15, unit: 'bunches', minThreshold: 3 },
      { itemName: 'chicken patty', quantity: 25, unit: 'pieces', minThreshold: 8 },
      { itemName: 'bun', quantity: 40, unit: 'pieces', minThreshold: 10 },
      { itemName: 'lettuce', quantity: 12, unit: 'heads', minThreshold: 4 },
      { itemName: 'tomato', quantity: 18, unit: 'pieces', minThreshold: 6 },
      { itemName: 'croutons', quantity: 8, unit: 'bags', minThreshold: 2 },
      { itemName: 'parmesan', quantity: 10, unit: 'lbs', minThreshold: 3 },
      { itemName: 'caesar dressing', quantity: 6, unit: 'bottles', minThreshold: 2 }
    ];

    await Inventory.insertMany(inventory);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedData;