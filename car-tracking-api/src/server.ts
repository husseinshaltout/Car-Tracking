// Import Configurations
import config from '@config';

// Import Pre-Loaded Entry Application
import app from '@app/index';

// Import Main Server Loaders
import Server from '@loaders/server';
import PostgresDbLoader from '@loaders/database';

// Create DB Loader Instance
const DBLoader = new PostgresDbLoader(config.DATABASE);

// Create Server and Start Listening
const server = new Server(app, DBLoader);
server.start();

export { server, DBLoader };
