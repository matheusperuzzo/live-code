import { AddAccount } from '@domain/account/add-account'
import { AddAccountModel, AccountModel } from '@domain/protocols/models/account'
import { Hasher } from '../../protocols/cryptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    await this.hasher.hash(accountData.password)
    return await new Promise(resolve => resolve(null))
  }
}
