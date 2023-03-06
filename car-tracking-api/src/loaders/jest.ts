import dataSeeder from '@common/utils/data-seeder';
import { server } from '../server';

beforeAll(async () => {
  await server.ConnectToDB();
});

beforeEach(async () => {
  await dataSeeder.deleteData();
  await dataSeeder.importData();
});

afterAll(async () => {
  await server.closeDatabaseConnection();
  await server.stop();
});
