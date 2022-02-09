import { AddAccount } from '../../../domain/account/add-account'
import { AccountModel, AddAccountModel } from '../../../domain/protocols/models/account'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { CpfValidator } from '../../protocols/validators/cpf-validator'
import { EmailValidator } from '../../protocols/validators/email-validator'
import { TelephoneValidator } from '../../protocols/validators/telephone-validator'
import { SignUpController } from './signup-controller'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    async isEmailValid (email: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new EmailValidatorStub()
}

const makeTelephoneValidator = (): TelephoneValidator => {
  class TelephoneValidatorStub implements TelephoneValidator {
    async isTelephoneValid (telephone: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new TelephoneValidatorStub()
}

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    async isCpfValid (cpf: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new CpfValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (accoutData: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve({
        id: 0,
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        telephone: 'valid_telephone',
        birthDate: new Date(),
        mothersName: 'valid_mothers_name',
        cpf: 'valid_cpf'
      }))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const telephoneValidatorStub = makeTelephoneValidator()
  const cpfValidatorStub = makeCpfValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, telephoneValidatorStub, cpfValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    telephoneValidatorStub,
    cpfValidatorStub,
    addAccountStub
  }
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  telephoneValidatorStub: TelephoneValidator
  cpfValidatorStub: CpfValidator
  addAccountStub: AddAccount
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password',
    telephone: 'valid_telephone',
    birthDate: 'valid_birth_date',
    mothersName: 'valid_mothers_name',
    cpf: 'valid_cpf'
  }
})

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('Should return 400 if no telephone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('telephone')))
  })

  test('Should return 400 if no birthDate is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('birthDate')))
  })

  test('Should return 400 if no mothersName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('mothersName')))
  })

  test('Should return 400 if no cpf is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cpf')))
  })

  test('Should call EmailValidator with valid email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isEmailValidSpy = jest.spyOn(emailValidatorStub, 'isEmailValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    await sut.handle(httpRequest)
    expect(isEmailValidSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return 400 if EmailValidator validation fails', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmailValid')
      .mockReturnValueOnce(
        new Promise(
          resolve => resolve(false)
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isEmailValid')
      .mockReturnValueOnce(
        new Promise(
          (resolve, reject) => reject(new Error(''))
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 400 if passwordConfirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'other_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })

  test('Should call TelephoneValidator with valid telephone', async () => {
    const { sut, telephoneValidatorStub } = makeSut()
    const isTelephoneValidSpy = jest.spyOn(telephoneValidatorStub, 'isTelephoneValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'valid_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    await sut.handle(httpRequest)
    expect(isTelephoneValidSpy).toHaveBeenCalledWith('valid_telephone')
  })

  test('Should return 400 if TelephoneValidator validation fails', async () => {
    const { sut, telephoneValidatorStub } = makeSut()
    jest.spyOn(telephoneValidatorStub, 'isTelephoneValid')
      .mockReturnValueOnce(
        new Promise(
          resolve => resolve(false)
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'invalid_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('telephone')))
  })

  test('Should return 500 if TelephoneValidator throws', async () => {
    const { sut, telephoneValidatorStub } = makeSut()
    jest.spyOn(telephoneValidatorStub, 'isTelephoneValid')
      .mockReturnValueOnce(
        new Promise(
          (resolve, reject) => reject(new Error(''))
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should call CpfValidator with valid cpf', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    const isCpfValidSpy = jest.spyOn(cpfValidatorStub, 'isCpfValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'valid_cpf'
      }
    }
    await sut.handle(httpRequest)
    expect(isCpfValidSpy).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should return 400 if CpfValidator validation fails', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isCpfValid')
      .mockReturnValueOnce(
        new Promise(
          resolve => resolve(false)
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'invalid_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('cpf')))
  })

  test('Should return 500 if CpfValidator throws', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isCpfValid')
      .mockReturnValueOnce(
        new Promise(
          (resolve, reject) => reject(new Error(''))
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should call AddAccount with valid data', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      telephone: 'valid_telephone',
      birthDate: 'valid_birth_date',
      mothersName: 'valid_mothers_name',
      cpf: 'valid_cpf'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add')
      .mockReturnValueOnce(
        new Promise(
          (resolve, reject) => reject(new Error(''))
        )
      )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_birth_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })
})
