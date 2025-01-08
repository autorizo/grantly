import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import {
  authRoutes,
  notificationRoutes,
  permissionRoutes,
  providerRoutes,
  resetPassword,
  signupRoutes,
  userRoutes,
} from '@routes/index';
import { authHandler } from '@utils/authHandler';
import axios from 'axios';

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
    credentials: true,
  })
);

app.use('/proxy-pdf', async (req, res) => {
  const pdfPath = req.query.pdfPath as string;
  try {
    const response = await axios.get(pdfPath, {
      responseType: 'arraybuffer',
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Failed to fetch PDF');
  }
});

// Reset password route
app.use(resetPassword);

// Auth routes
app.use(authRoutes);

// Register signup routes
app.use(signupRoutes);

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
