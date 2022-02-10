import { AddAccountModel, AccountModel } from '@domain/protocols/models/account'
import { AddAccountRepository } from '@root/src/data/protocols/db/repositories/account/add-account-repository'
import { DbAccountModel } from '@root/src/data/sequelize/models/account-model'

export class AccountSequelizeRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await DbAccountModel.create({ ...accountData })
    return account
  }
}
