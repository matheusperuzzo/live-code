import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should call validator isEmail method with valid email', async () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    await sut.isEmailValid('valid_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('should return false if validation fails', async () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isEmailValid = await sut.isEmailValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('should return true if validation succeeds', async () => {
    const sut = new EmailValidatorAdapter()
    const isEmailValid = await sut.isEmailValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
})
