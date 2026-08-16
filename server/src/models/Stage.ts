import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface StageAttributes {
  id: number;
  name: string;
  order_index: number;
  color: string;
  is_won: boolean;
  is_lost: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type StageCreationAttributes = Optional<
  StageAttributes,
  'id' | 'order_index' | 'color' | 'is_won' | 'is_lost' | 'created_at' | 'updated_at'
>;

export class Stage
  extends Model<StageAttributes, StageCreationAttributes>
  implements StageAttributes
{
  declare id: number;
  declare name: string;
  declare order_index: number;
  declare color: string;
  declare is_won: boolean;
  declare is_lost: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Stage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    order_index: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#6366f1',
    },
    is_won: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_lost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'stages',
    timestamps: true,
    underscored: true,
  }
);
