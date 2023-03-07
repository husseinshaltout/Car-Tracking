import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import logger from '@loaders/logger';

import CrossOriginError from '@common/errors/crossOriginError';

export default class SocketLoader {
  private io: Server;

  constructor(server: http.Server, whitelist: string[]) {
    const corsOptions: cors.CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new CrossOriginError());
        }
      },
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 1000,
    };

    this.io = new Server(server, {
      cors: corsOptions,
    });

    this.io.on('connection', (socket) => {
      logger.info(`Client ${socket.id} Connected `);
    });
  }

  //   init(server: http.Server, whitelist: string[]): void {
  //     const corsOptions: cors.CorsOptions = {
  //       origin: (origin, callback) => {
  //         if (!origin || whitelist.indexOf(origin) !== -1) {
  //           callback(null, true);
  //         } else {
  //           callback(new CrossOriginError());
  //         }
  //       },
  //       allowedHeaders: ['Content-Type', 'Authorization'],
  //       credentials: true,
  //       maxAge: 1000,
  //     };

  //     this.io = new Server(server, {
  //       cors: corsOptions,
  //     });

  //     this.io.on('connection', (socket) => {
  //       logger.info(`Client ${socket.id} Connected `);
  //     });
  //   }

  getIO() {
    if (!this.io) throw new Error('Socket Is Not Initialized');

    return this.io;
  }
}
