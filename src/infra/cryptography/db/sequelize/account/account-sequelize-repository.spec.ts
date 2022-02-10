import { DbAccountModel } from '@root/src/data/sequelize/models/account-model'
import { SequelizeHelper } from '../helpers/sequelize-helper'
import { AccountSequelizeRepository } from './account-sequelize-repository'

describe('Account Sequelize Repository', () => {
  beforeAll(async () => {
    await SequelizeHelper.connect('mysql://root:Matheus061218!@localhost:3306')
  })

  afterAll(async () => {
    await SequelizeHelper.disconnect()
  })

  beforeEach(async () => {
    await DbAccountModel.truncate()
  })

  test('Should return an account on add success', async () => {
    const sut = new AccountSequelizeRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      telephone: 'any_telephone',
      birthDate: '2003-02-12',
      mothersName: 'any_mothers_name',
      cpf: 'any_cpf'
    })
    console.log(account)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
    expect(account.birthDate).toEqual(new Date('2003-02-12'))
    expect(account.telephone).toBe('any_telephone')
    expect(account.mothersName).toBe('any_mothers_name')
    expect(account.cpf).toBe('any_cpf')
  })
})
