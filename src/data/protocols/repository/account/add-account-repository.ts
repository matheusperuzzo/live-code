import { AccountModel, AddAccountModel } from '@domain/protocols/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
