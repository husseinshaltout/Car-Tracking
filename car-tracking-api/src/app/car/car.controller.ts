import { Request, Response, NextFunction, Router } from 'express';

import catchAsync from '@common/middlewares/catchAsync';

import HttpStatus from '@common/enums/httpStatus';

import carService from '@app/car/car.service';

class CarController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // TODO: Add body Validation
    this.router.get('/', catchAsync(this.getAllCars));
    this.router.post('/', catchAsync(this.createCar));
    this.router.get('/:plateNumber', catchAsync(this.getCarByPlateNumber));
  }

  private async getAllCars(req: Request, res: Response) {
    const cars = await carService.getAllCars();
    res
      .status(HttpStatus.OK)
      .json({ message: 'Cars retrieved successfully', cars: cars });
  }

  private async createCar(req: Request, res: Response) {
    const car = await carService.createCar(req.body);
    res
      .status(HttpStatus.CREATED)
      .json({ message: `Car added successfully`, car: car });
  }

  private async getCarByPlateNumber(req: Request, res: Response) {
    const { plateNumber } = req.params;
    const car = await carService.getCarByPlateNumber(plateNumber);

    res.status(HttpStatus.CREATED).json({
      message: 'Car retrieved successfully',
      car: car,
    });
  }
}

const carController = new CarController();
export default carController;
