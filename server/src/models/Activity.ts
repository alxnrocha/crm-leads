import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface ActivityAttributes {
  id: number;
  lead_id: number;
  user_id?: number | null;
  type: 'call' | 'meeting' | 'email' | 'note';
  summary: string;
  scheduled_at?: Date | null;
  completed_at?: Date | null;
  created_at?: Date;
}

export type ActivityCreationAttributes = Optional<
  ActivityAttributes,
  'id' | 'user_id' | 'scheduled_at' | 'completed_at' | 'created_at'
>;

export class Activity
  extends Model<ActivityAttributes, ActivityCreationAttributes>
  implements ActivityAttributes
{
  declare id: number;
  declare lead_id: number;
  declare user_id: number | null;
  declare type: 'call' | 'meeting' | 'email' | 'note';
  declare summary: string;
  declare scheduled_at: Date | null;
  declare completed_at: Date | null;
  declare readonly created_at: Date;
}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'leads',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    type: {
      type: DataTypes.ENUM('call', 'meeting', 'email', 'note'),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'activities',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    indexes: [
      { fields: ['lead_id'] },
      { fields: ['user_id'] },
      { fields: ['type'] },
      { fields: ['scheduled_at'] },
    ],
  }
);
