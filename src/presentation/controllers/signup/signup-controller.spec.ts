import { badRequest } from '../../helpers/http-helper'
import { SignUpController } from './signup-controller'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
})
