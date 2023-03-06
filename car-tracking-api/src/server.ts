// Import Configurations
import config from '@config';

// Import Pre-Loaded Entry Application
import app from '@app/index';

// Import Main Server Loaders
import Server from '@loaders/server';
import sequelize from '@loaders/database';

// Create DB Loader Instance
const DBLoader = sequelize;

// Create Server and Start Listening
const server = new Server(app, DBLoader);
server.start();

export { server };
