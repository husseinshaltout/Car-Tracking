import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';

import sequelize from '@loaders/database';

import Location from '@models/location.model';

class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>> {
  declare id: CreationOptional<number>;
  declare plate_number: string;
  declare last_longitude: number;
  declare last_latitude: number;
}

Car.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  { sequelize }
);
Car.hasMany(Location, {
  sourceKey: 'id',
  foreignKey: 'car_id',
  as: 'locations',
});

// const car = new Car();

export default Car;
