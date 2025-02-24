import { verifyToken } from '@utils/index';
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

const users: Map<string, string> = new Map(); // userId -> socketId

export let io: Server; // Exportamos la instancia para usarla en otros módulos

export const initializeSocket = (httpServer: HttpServer) => {
  console.log('🔒 Creating socket...');
  io = new Server(httpServer, {
    cors: { origin: '*' }, // Ajusta esto según tu frontend
    transports: ['websocket', 'polling'],
  });

  io.on('connection', async (socket: Socket) => {
    try {
      console.log('🔒 Connecting socket...');

      // Obtener el token del header de autorización
      const bearerHeader = socket.handshake.headers.authorization ?? '';
      const bearer = bearerHeader.split(' ');

      if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
        console.log('❌ Token no tiene el formato esperado');
        socket.disconnect();
        return;
      }

      const bearerToken = bearer[1];

      // Verificar el token
      const session = await verifyToken(bearerToken);
      if (!session) {
        console.log('❌ Token inválido o expirado');
        socket.disconnect();
        return;
      }

      // Extraer userId del token verificado
      const userId = session.id as string;
      socket.data.userId = userId; // Almacenar en socket
      users.set(userId, socket.id);
      console.log(`🔗 Usuario conectado: ${userId}`);

      // Manejar desconexión
      socket.on('disconnect', () => {
        users.delete(userId);
        console.log(`❌ Usuario desconectado: ${userId}`);
      });
    } catch (error) {
      console.error('❌ Error en autenticación WebSocket:', error);
      socket.disconnect();
    }
  });
};

export const sendNotificationToUser = (userId: string, message: string) => {
  const socketId = users.get(userId);
  if (socketId) {
    io.to(socketId).emit('receive-notification', {
      message,
      timestamp: new Date(),
    });
    console.log(`📩 Notificación enviada a usuario ${userId}`);
  } else {
    console.log(`⚠ Usuario ${userId} no está conectado`);
  }
};
