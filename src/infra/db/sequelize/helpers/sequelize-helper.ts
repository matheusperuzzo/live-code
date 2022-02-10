import { Sequelize } from 'sequelize'

export const SequelizeHelper = {
  sequelize: null as unknown as Sequelize,

  async connect (uri: string): Promise<void> {
    this.sequelize = new Sequelize(uri)

    await this.sequelize.authenticate()
  },

  async disconnect (): Promise<void> {
    await this.sequelize.close()
    this.sequelize = null
  }
}
