import { CpfValidatorAdapter } from './cpf-validator-adapter'
import CPF from 'cpf-check'

describe('CpfValidator Adapter', () => {
  test('Should call cpf-check validate method with valid cpf', async () => {
    const sut = new CpfValidatorAdapter()
    const validateSpy = jest.spyOn(CPF, 'validate')
    await sut.isCpfValid('valid_cpf')
    expect(validateSpy).toHaveBeenCalledWith('valid_cpf')
  })

  test('Should return false if validation fails', async () => {
    const sut = new CpfValidatorAdapter()
    const isValid = await sut.isCpfValid('invalid_cpf')
    expect(isValid).toBe(false)
  })

  test('Should return true if validation succeeds', async () => {
    const sut = new CpfValidatorAdapter()
    jest.spyOn(CPF, 'validate').mockReturnValueOnce(true)
    const isValid = await sut.isCpfValid('valid_cpf')
    expect(isValid).toBe(true)
  })
})
