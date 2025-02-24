if (process.env.NODE_ENV === 'production') {
  const moduleAlias = require('module-alias');
  moduleAlias.addAliases({
    '@services': `${__dirname}/services`,
    '@routes': `${__dirname}/routes`,
    '@controllers': `${__dirname}/controllers`,
    '@db': `${__dirname}/db`,
    '@errors': `${__dirname}/errors`,
    '@utils': `${__dirname}/utils`,
    '@sockets': `${__dirname}/sockets`,
  });
}

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
  ticketRoutes
} from '@routes/index';
import { authHandler } from '@utils/authHandler';
import axios from 'axios';
import { createServer } from 'http';
import { initializeSocket } from '@sockets/notifications';

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

app.use('/typeform-webhook', async (req, res) => {
  console.log(req.body);
  res.status(200).send('OK');
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
app.use(ticketRoutes);

const httpServer = createServer(app);

// Default route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Inicialización del socket con el servidor HTTP
initializeSocket(httpServer);

// Iniciar el servidor
httpServer.listen(PORT, () => {
  console.info(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
