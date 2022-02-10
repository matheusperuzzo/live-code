import { DataTypes, Model } from 'sequelize'
import { AccountModel } from '../../../domain/protocols/models/account'
import { sequelize } from '../util/database'

export class DbAccountModel extends Model {}

export interface DbAccountModel extends AccountModel {}

DbAccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    mothersName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'accounts',
    timestamps: false,
    underscored: true,
    sequelize
  }
)
