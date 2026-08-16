import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface LeadSourceAttributes {
  id: number;
  name: string;
  created_at?: Date;
}

export type LeadSourceCreationAttributes = Optional<LeadSourceAttributes, 'id' | 'created_at'>;

export class LeadSource
  extends Model<LeadSourceAttributes, LeadSourceCreationAttributes>
  implements LeadSourceAttributes
{
  declare id: number;
  declare name: string;
  declare readonly created_at: Date;
}

LeadSource.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'lead_sources',
    timestamps: true,
    updatedAt: false,
    underscored: true,
  }
);
