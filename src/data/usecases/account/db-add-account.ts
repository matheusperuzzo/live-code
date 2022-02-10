import { AddAccount } from '@domain/account/add-account'
import { AddAccountModel, AccountModel } from '@domain/protocols/models/account'
import { Hasher } from '../../protocols/cryptography/hasher'
import { AddAccountRepository } from '../../protocols/repository/account/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => resolve(null))
  }
}
