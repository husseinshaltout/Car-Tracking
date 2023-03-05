// Import Dependencies
import { Sequelize } from 'sequelize';

interface Config {
  URI: string;
  PASSWORD: string;
}

// Class loads DB Config and had methods for connecting and disconnecting
export default class PostgresDbLoader {
  connString: string;
  sequelize: Sequelize;

  constructor(config: Config) {
    this.connString = config.URI.replace('<PASSWORD>', config.PASSWORD);
  }

  connect() {
    this.sequelize = new Sequelize(this.connString);

    if (!this.sequelize) throw new Error('Connection Failed');

    const isDev = process.env.NODE_ENV === 'development';

    this.sequelize.sync({ force: isDev });

    return this.sequelize.authenticate();
  }

  async closeConnection() {
    if (this.sequelize) {
      try {
        await this.sequelize.close();
        console.log('Connection has been closed successfully.');
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }

  getSequelize() {
    if (!this.sequelize) {
      throw new Error('Sequelize instance not yet created.');
    }
    return this.sequelize;
  }
}
