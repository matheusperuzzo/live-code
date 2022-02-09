import validator from 'validator'
import { TelephoneValidatorAdapter } from './telephone-validator-adapter'

describe('TelephoneValidator Adapter', () => {
  test('should call validator isMobilePhone method with valid telephone', async () => {
    const sut = new TelephoneValidatorAdapter()
    const isTelephoneSpy = jest.spyOn(validator, 'isMobilePhone')
    await sut.isTelephoneValid('valid_Telephone')
    expect(isTelephoneSpy).toHaveBeenCalledWith('valid_Telephone')
  })
})
