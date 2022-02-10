import { AddAccountModel } from '@domain/protocols/models/account'
import { Hasher } from '../../protocols/cryptography/hasher'
import { DbAddAccount } from './db-add-account'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hash'))
    }
  }
  return new HasherStub()
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
  }
}

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with valid password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const fakeAddAccount: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      telephone: 'valid_telephone',
      birthDate: 'valid_birth_date',
      mothersName: 'valid_mothers_name',
      cpf: 'valid_cpf'
    }
    await sut.add(fakeAddAccount)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })
})
