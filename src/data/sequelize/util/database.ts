import { Sequelize, Options } from 'sequelize'
import sequelizeConfig from '@root/sequelize.config'

const connectionOptions: Options = {
  ...sequelizeConfig,
  dialect: 'mysql',
  define: {
    underscored: true,
    omitNull: false
  },
  pool: {
    max: 5,
    min: 0
  },
  dialectOptions: {
    connectTimeout: 60000
  }
}

export const sequelize = new Sequelize(connectionOptions)
