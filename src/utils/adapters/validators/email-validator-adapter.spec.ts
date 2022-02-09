import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should call validator isEmail method with valid email', async () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    await sut.isEmailValid('valid_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
