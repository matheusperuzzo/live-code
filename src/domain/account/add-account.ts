import { AccountModel, AddAccountModel } from '@domain/protocols/models/account'

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
