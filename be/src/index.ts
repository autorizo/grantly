import express from 'express';
import cors from 'cors';
import {
  authRoutes,
  notificationRoutes,
  permissionRoutes,
  providerRoutes,
  userRoutes,
} from '@routes/index'; // Make sure these paths are correct for your setup
import { authHandler } from '@utils/authHandler'; // Make sure this path is correct too

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Auth routes
app.use(authRoutes);

// Register custom auth handler routes
app.use(authHandler);

// Register other routes
app.use(permissionRoutes);
app.use(providerRoutes);
app.use(userRoutes);
app.use(notificationRoutes);

// Default route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
