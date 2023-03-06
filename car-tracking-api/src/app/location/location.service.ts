import NotFoundError from '@common/errors/NotFoundError';

import calcDistanceInKM from '@common/utils/coordDistanceCalculator';

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

    const speed = await this.calculateSpeed(car, data);

    const location = await this.createCarLocation(car, data, speed);

    car.last_longitude = data.longitude;
    car.last_latitude = data.latitude;

    return await car.save();
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

  private async calculateSpeed(car: Car, data: any) {
    const distance = await this.calculateDistance(car, data);
    const timeElapsed = await this.calcTimeElapsed(car);
    const speed = (distance / timeElapsed) * 3.6;
    return Math.round(speed * 100) / 100;
  }

  private async calculateDistance(car: Car, data: any) {
    const { lastLng, lastLat } = await this.getCarLastCoord(car);
    const { longitude, latitude } = data;
    const distance = calcDistanceInKM(lastLng, lastLat, longitude, latitude);

    return distance;
  }

  private async getCarLastCoord(car: any) {
    const { last_longitude, last_latitude } = car;

    return { lastLng: last_longitude, lastLat: last_latitude };
  }

  private async calcTimeElapsed(car: any) {
    const lastUpdatedTimeInSeconds = new Date(car.updatedAt).getTime() / 1000;
    const currentTimeInSeconds = Date.now() / 1000;
    const timeElapsed = currentTimeInSeconds - lastUpdatedTimeInSeconds;

    return timeElapsed;
  }
}

const locationService = new LocationService();
export default locationService;
