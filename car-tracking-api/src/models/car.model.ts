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
  declare average_speed: number;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    last_latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    average_speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
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
