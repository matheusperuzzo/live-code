import { AccountModel, AddAccountModel } from '../protocols/models/account'

export interface AddAccount {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
