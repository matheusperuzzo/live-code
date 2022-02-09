import validator from 'validator'
import { TelephoneValidatorAdapter } from './telephone-validator-adapter'

describe('TelephoneValidator Adapter', () => {
  test('should call validator isMobilePhone method with valid telephone', async () => {
    const sut = new TelephoneValidatorAdapter()
    const isTelephoneSpy = jest.spyOn(validator, 'isMobilePhone')
    await sut.isTelephoneValid('valid_Telephone')
    expect(isTelephoneSpy).toHaveBeenCalledWith('valid_Telephone')
  })

  test('should return false if validation fails', async () => {
    const sut = new TelephoneValidatorAdapter()
    const isValid = await sut.isTelephoneValid('invalid_Telephone')
    expect(isValid).toBe(false)
  })

  test('should return true if validation succeeds', async () => {
    const sut = new TelephoneValidatorAdapter()
    jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(true)
    const isValid = await sut.isTelephoneValid('valid_Telephone')
    expect(isValid).toBe(true)
  })
})
