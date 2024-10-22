// src/index.ts
import express from 'express';
import {
  notificationRoutes,
  permissionRoutes,
  providerRoutes,
  userRoutes,
} from '@routes/index';
import cors from 'cors';

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Register permission routes
app.use(permissionRoutes);

// Register user routes
app.use(userRoutes);

// Register user routes
app.use(notificationRoutes);

app.use(providerRoutes)

// Default route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
