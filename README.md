# Restaurant Management System

A full-stack MERN application for restaurant operations including menu management, order processing, table reservations, and inventory tracking.

## Features

- **Menu Management**: View and manage restaurant menu items
- **Order Processing**: Place orders with automatic inventory updates
- **Table Reservations**: Check availability and make reservations
- **Inventory Management**: Track stock levels with low-stock alerts
- **Admin Dashboard**: View orders, manage inventory, and generate reports

## Tech Stack

- **Frontend**: React with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Basic CSS (can be enhanced with CSS frameworks)

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (Community Server or Atlas)

### Installation

1. **Navigate to the project directory**

2. **Install backend dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Start MongoDB**:
   - If using MongoDB Community Server:
     ```bash
     # Create data directory if it doesn't exist
     mkdir C:\data\db
     # Start MongoDB
     mongod --dbpath "C:\data\db"
     ```
   - Or use MongoDB Compass to start the service
   - For MongoDB Atlas: Update the `MONGO_URI` in `server/.env`

5. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5001`

6. **Start the frontend**:
   ```bash
   cd client
   npm start
   ```
   The app will be available at `http://localhost:3000`

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Place new order
- `PUT /api/orders/:id` - Update order status

### Reservations
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/availability` - Check table availability
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id/cancel` - Cancel reservation

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory
- `GET /api/inventory/alerts` - Get low stock alerts

### Reports
- `GET /api/reports/sales/daily?date=YYYY-MM-DD` - Daily sales report
- `GET /api/reports/stock` - Stock alerts

## Database Models

- **MenuItem**: name, description, price, category, ingredients, availability
- **Order**: customer info, items, total, status, table number
- **Table**: number, capacity, status, location
- **Reservation**: customer info, table, date/time, guests, status
- **Inventory**: item name, quantity, unit, min threshold

## Features Implemented

✅ Database models for all entities
✅ APIs for all required operations
✅ Order processing with inventory auto-update
✅ Table availability checking
✅ Inventory management with alerts
✅ Basic admin panel
✅ Responsive React UI
✅ Error handling and loading states
✅ Initial data seeding

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --dbpath "C:\data\db"`
- Check if port 27017 is available
- Verify `MONGO_URI` in `server/.env`

### Port Issues
- Backend runs on port 5001
- Frontend runs on port 3000
- Make sure these ports are available

### API Connection Issues
- Check browser console for CORS errors
- Ensure backend is running before starting frontend
- Verify API_BASE_URL in `client/src/services/api.js`

## Future Enhancements

- User authentication and authorization
- Real-time order status updates
- Payment integration
- Advanced reporting with charts
- Mobile app
- Email/SMS notifications
- Menu customization options
