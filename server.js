import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";
import reservationRoutes from "./routes/reservations.js";
import inventoryRoutes from "./routes/inventory.js";
import reportRoutes from "./routes/reports.js";
import seedData from "./seed.js";

dotenv.config();

const app = express();
const allowedOrigins = ["https://couples-restaruant.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/restaurant_management",
  )
  .then(async () => {
    console.log("Connected to MongoDB");
    // Seed initial data
    await seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Please make sure MongoDB is running on localhost:27017");
    console.log(
      'For testing purposes, you can start MongoDB with: mongod --dbpath "C:\\data\\db"',
    );
    console.log("Or install MongoDB Community Server if not installed.");
    process.exit(1);
  });

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant Management Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
