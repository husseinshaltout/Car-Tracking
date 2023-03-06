import NotFoundError from '@common/errors/NotFoundError';

import Car from '@models/car.model';

class CarService {
  constructor() {}

  async getAllCars() {
    return await Car.findAll();
  }

  async createCar(data: any) {
    const car = await Car.create({
      plate_number: data.plateNumber,
      last_longitude: data.longitude,
      last_latitude: data.latitude,
    });

    return car;
  }

  async getCarByPlateNumber(plateNumber: string) {
    const car = await Car.findOne({ where: { plate_number: plateNumber } });
    if (!car) throw new NotFoundError('Requested Car Not Found');
    return car;
  }

  async updateCarCoordinates(plateNumber: string, data: any) {
    const car = await Car.update(
      { last_longitude: data.longitude, last_latitude: data.latitude },
      {
        where: {
          plate_number: plateNumber,
        },
      }
    );

    if (!car) throw new NotFoundError('Requested Car Not Found');

    return car;
  }
}

const carService = new CarService();
export default carService;
