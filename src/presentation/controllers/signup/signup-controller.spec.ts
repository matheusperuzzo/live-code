import { badRequest } from '../../helpers/http-helper'
import { EmailValidator } from '../../protocols/validators/email-validator'
import { SignUpController } from './signup-controller'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    async isEmailValid (email: string): Promise<boolean> {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        telephone: 'any_telephone',
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('passwordConfirmation'))
  })

  test('Should return 400 if no telephone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('telephone'))
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
    expect(httpResponse).toEqual(badRequest('birthDate'))
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
        birthDate: 'any_bith_date',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('mothersName'))
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
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('cpf'))
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
        birthDate: 'any_bith_date',
        mothersName: 'any_mothers_name',
        cpf: 'any_cpf'
      }
    }
    await sut.handle(httpRequest)
    expect(isEmailValidSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
