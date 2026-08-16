import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface LeadAttributes {
  id: number;
  user_id?: number | null;
  stage_id: number;
  source_id?: number | null;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string | null;
  value_amount: number;
  priority: 'low' | 'medium' | 'high';
  notes?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type LeadCreationAttributes = Optional<
  LeadAttributes,
  | 'id'
  | 'user_id'
  | 'source_id'
  | 'phone'
  | 'value_amount'
  | 'priority'
  | 'notes'
  | 'created_at'
  | 'updated_at'
>;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  declare id: number;
  declare user_id: number | null;
  declare stage_id: number;
  declare source_id: number | null;
  declare company_name: string;
  declare contact_name: string;
  declare email: string;
  declare phone: string | null;
  declare value_amount: number;
  declare priority: 'low' | 'medium' | 'high';
  declare notes: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    stage_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'stages',
        key: 'id',
      },
    },
    source_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'lead_sources',
        key: 'id',
      },
    },
    company_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    value_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
      get() {
        const rawValue = this.getDataValue('value_amount');
        return rawValue ? Number(rawValue) : 0;
      },
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'leads',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['stage_id'] },
      { fields: ['priority'] },
      { fields: ['company_name'] },
      { fields: ['email'] },
    ],
  }
);
