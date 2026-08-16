import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'sales';
  avatar_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'role' | 'avatar_url' | 'created_at' | 'updated_at'
>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare role: 'admin' | 'sales';
  declare avatar_url: string | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'sales'),
      allowNull: false,
      defaultValue: 'sales',
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);
