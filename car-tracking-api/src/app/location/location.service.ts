import NotFoundError from '@common/errors/NotFoundError';

import {
  calcDistanceInKM,
  calculateAverageSpeed,
  calcTimeElapsed,
  calculateSpeed,
} from '@common/utils/utilCalculator';

import carService from '@app/car/car.service';
import Location from '@models/location.model';
import Car from '@models/car.model';

class LocationService {
  constructor() {}

  async getAllLocations() {
    return await Location.findAll();
  }

  async updateCarLocation(plateNumber: string, data: any) {
    const car = await carService.getCarByPlateNumber(plateNumber);

    if (!car) throw new NotFoundError('Requested Car Not Found');

    const { last_longitude, last_latitude } = car;
    const { longitude, latitude } = data;
    const distance = calcDistanceInKM(
      last_longitude,
      last_latitude,
      longitude,
      latitude
    );

    const timeElapsed = calcTimeElapsed(car.updatedAt);

    const speed = calculateSpeed(distance, timeElapsed);

    const location = await this.createCarLocation(car, data, speed);

    const averageSpeed = await this.getCarAverageSpeed(car);

    car.last_longitude = data.longitude;
    car.last_latitude = data.latitude;
    car.average_speed = averageSpeed;

    return await car.save();
  }

  private async getCarAverageSpeed(car: Car) {
    const carSpeedList = await Location.findAll({
      attributes: ['speed'],
      where: { car_id: car.id },
    });

    return calculateAverageSpeed(carSpeedList);
  }

  private async createCarLocation(car: Car, data: any, speed: number) {
    const location = await Location.create({
      car_id: car.id,
      longitude: data.longitude,
      latitude: data.latitude,
      speed: speed,
    });

    return location;
  }
}

const locationService = new LocationService();
export default locationService;
