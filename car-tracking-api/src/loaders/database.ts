// Import Configurations
import config from '@config';

// Import Dependencies
import { Sequelize } from 'sequelize';

const connString = config.DATABASE.URI.replace(
  '<PASSWORD>',
  config.DATABASE.PASSWORD
);

const sequelize = new Sequelize(connString);
const isDev = process.env.NODE_ENV === 'development';

sequelize.sync({ alter: isDev });

export default sequelize;

// Class loads DB Config and had methods for connecting and disconnecting
// export default class SequelizeLoader {
//   sequelize: Sequelize;

//   constructor(config: Config) {
//     const connString = config.URI.replace('<PASSWORD>', config.PASSWORD);
//     this.sequelize = new Sequelize(connString);
//   }

//   connect() {
//     return this.sequelize.authenticate();
//   }

//   closeConnection() {
//     return this.sequelize.close();
//   }
//   getConnection() {
//     return this.sequelize;
//   }
// }
