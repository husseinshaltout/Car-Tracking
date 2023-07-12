import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from 'sequelize';

import sequelize from '@loaders/database';

import Car from '@models/car.model';

class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  declare id: CreationOptional<number>;
  declare longitude: number;
  declare latitude: number;
  declare speed: number;

  declare car_id: ForeignKey<Car['id']>;
}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  { sequelize }
);

export default Location;
