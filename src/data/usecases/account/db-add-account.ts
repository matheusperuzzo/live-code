import { AddAccount } from '@domain/account/add-account'
import { AddAccountModel, AccountModel } from '@domain/protocols/models/account'
import { Hasher } from '../../protocols/cryptography/hasher'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
