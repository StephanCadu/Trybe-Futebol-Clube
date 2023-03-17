import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

MatchesModel.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Teams;
