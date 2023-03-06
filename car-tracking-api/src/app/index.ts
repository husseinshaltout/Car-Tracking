import Application from '@loaders/app';

import carController from '@app/car/car.controller';
import locationController from '@app/location/location.controller';

const appRouters = [
  { route: '/car', router: carController.router },
  { route: '/location', router: locationController.router },
];

const app = new Application();
app.setApiRouters(appRouters);

export default app;
