import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Stage } from './Stage.js';
import { LeadSource } from './LeadSource.js';
import { Lead } from './Lead.js';
import { Activity } from './Activity.js';

// Define Associations
// 1. User <-> Lead
User.hasMany(Lead, { foreignKey: 'user_id', as: 'leads' });
Lead.belongsTo(User, { foreignKey: 'user_id', as: 'assigned_user' });

// 2. Stage <-> Lead
Stage.hasMany(Lead, { foreignKey: 'stage_id', as: 'leads' });
Lead.belongsTo(Stage, { foreignKey: 'stage_id', as: 'stage' });

// 3. LeadSource <-> Lead
LeadSource.hasMany(Lead, { foreignKey: 'source_id', as: 'leads' });
Lead.belongsTo(LeadSource, { foreignKey: 'source_id', as: 'source' });

// 4. Lead <-> Activity
Lead.hasMany(Activity, { foreignKey: 'lead_id', as: 'activities', onDelete: 'CASCADE' });
Activity.belongsTo(Lead, { foreignKey: 'lead_id', as: 'lead' });

// 5. User <-> Activity
User.hasMany(Activity, { foreignKey: 'user_id', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export async function syncDatabase(force = false) {
  try {
    await sequelize.sync({ force, alter: !force });
    console.log('✅ Base de datos sincronizada con los modelos ORM.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', (error as Error).message);
    throw error;
  }
}

export { sequelize, User, Stage, LeadSource, Lead, Activity };
