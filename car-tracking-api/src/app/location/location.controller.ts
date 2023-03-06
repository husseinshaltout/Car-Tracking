import { Request, Response, NextFunction, Router } from 'express';

import catchAsync from '@common/middlewares/catchAsync';

import HttpStatus from '@common/enums/httpStatus';

import locationService from '@app/location/location.service';

class LocationController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // TODO: Add body Validation
    this.router.get('/', catchAsync(this.getAllLocations));
    this.router.patch('/:plateNumber', catchAsync(this.updateCarLocation));
  }

  private async getAllLocations(req: Request, res: Response) {
    const locations = await locationService.getAllLocations();

    res.status(HttpStatus.OK).json({
      message: 'All Locations retrieved successfully',
      locations: locations,
    });
  }

  private async updateCarLocation(req: Request, res: Response) {
    const { plateNumber } = req.params;
    const car = await locationService.updateCarLocation(plateNumber, req.body);

    res.status(HttpStatus.OK).json({
      message: 'Car coordinates updated successfully',
      car: car,
    });
  }
}

const locationController = new LocationController();
export default locationController;
