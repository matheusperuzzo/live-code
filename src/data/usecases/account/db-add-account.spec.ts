import { AccountModel, AddAccountModel } from '@domain/protocols/models/account'
import { Hasher } from '../../protocols/cryptography/hasher'
import { AddAccountRepository } from '../../protocols/db/repositories/account/add-account-repository'
import { DbAddAccount } from './db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeFakeAddAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
  telephone: 'valid_telephone',
  birthDate: 'valid_birth_date',
  mothersName: 'valid_mothers_name',
  cpf: 'valid_cpf'
})

const makeFakeAccount = (): AccountModel => ({
  id: 0,
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  telephone: 'valid_telephone',
  birthDate: new Date(),
  mothersName: 'valid_mothers_name',
  cpf: 'valid_cpf'
})

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with valid password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAddAccount())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with valid data', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const fakeAddAccount = makeFakeAddAccount()
    await sut.add(fakeAddAccount)
    expect(addSpy).toHaveBeenCalledWith(Object.assign({}, fakeAddAccount, { password: 'hashed_password' }))
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.add(makeFakeAddAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAddAccount())
    expect(account).toEqual(makeFakeAccount())
  })
})
