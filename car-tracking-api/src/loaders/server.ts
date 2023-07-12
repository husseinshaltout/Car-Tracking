// Import Dependencies
import config from '@config';

import logger from '@loaders/logger';
import Application from '@loaders/app';
import { Sequelize } from 'sequelize';

// Main Server Class
export default class Server {
  // Constructor to initialize an App preloaded with the correct features
  constructor(private app: Application, private DBLoader: Sequelize) {
    if (config.NODE_ENV === 'development') {
      this.initDevServer();
    } else if (config.NODE_ENV === 'test') {
      this.initTestServer();
    } else {
      this.initProdServer();
    }
  }

  // Property Getters
  getExpressApp() {
    return this.app.app;
  }

  getDBLoader() {
    return this.DBLoader;
  }

  getAppServer() {
    return this.app.server;
  }

  // Server Start Function
  async start() {
    this.handleExit();
    this.ConnectToDB();
    this.app.startServer(config.PORT);
    // this.socket.init(this.app.server, config.CORS_WHITELIST);
    // this.app.initSocket();
  }

  // Database Connection Functions
  async ConnectToDB() {
    return this.DBLoader.authenticate()
      .then(() => {
        logger.info('DB connection successful!');
      })
      .catch((err) => {
        logger.error('Error connecting to Database!');
        logger.error('Shutting Down Server');
        process.exit(1);
      });
  }

  async closeDatabaseConnection() {
    return this.DBLoader.close();
  }

  // Initialize a Development Server
  private initDevServer() {
    this.app
      .enableRequestLogging()
      .enableCORS(config.CORS_WHITELIST)
      .enableBodyParser()
      .enableCookieParser()
      .enableXssProtection()
      .useApiRouters()
      .redirectToNotFound()
      .enableErrorController();
  }

  private initTestServer() {
    //TODO: Prep for Testing
  }

  private initProdServer() {
    this.app
      .enableRequestLimiter(5000)
      .enableCORS(config.CORS_WHITELIST)
      .enableTrustProxy()
      .enableBodyParser()
      .enableCookieParser()
      .enableXssProtection()
      .useApiRouters()
      .redirectToNotFound()
      .enableErrorController();
  }

  // Server Exit Listeners
  private handleExit() {
    process.on('uncaughtException', (err) => {
      logger.error('ERROR: UNCAUGHT EXCEPTION\nABORTING AND SHUTTING DOWN...');
      logger.error(err);
      this.stopServer(1);
    });

    process.on('unhandledRejection', (err) => {
      logger.error('ERROR: UNHANDLED REJECTION\nABORTING AND SHUTTING DOWN...');
      logger.error(err);
      this.stopServer(1);
    });

    process.on('SIGINT', () => {
      logger.warn('Server Stopped\nSHUTTING DOWN...');
      this.stopServer(0);
    });
  }

  async stop() {
    this.app.server.close(async () => {
      await Promise.all([this.DBLoader.close()]);
    });
  }

  // Graceful Stop Function
  private stopServer(exitCode: number) {
    this.app.server.close(async () => {
      await Promise.all([this.DBLoader.close()]);

      logger.info('Process graceful-stop initiated!');
      process.exit(exitCode);
    });
  }
}
