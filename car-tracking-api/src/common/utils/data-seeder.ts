import { readFileSync } from 'fs';
import Car from '@models/car.model';

class DataSeeder {
  // READ JSON FILE

  constructor() {}

  // IMPORT DATA INTO DB
  async importData() {
    try {
    } catch (err) {
      console.log(`Import Error ${err}`);
    }
  }

  // DELETE ALL DATA FROM DB
  async deleteData() {
    try {
      await Car.destroy({
        where: {},
        truncate: true,
      });
    } catch (err) {
      console.log(`Delete Error: ${err}`);
    }
  }
}

const dataSeeder = new DataSeeder();
export default dataSeeder;
