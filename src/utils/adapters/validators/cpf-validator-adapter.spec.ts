import { CpfValidatorAdapter } from './cpf-validator-adapter'
import CPF from 'cpf-check'

describe('CpfValidator Adapter', () => {
  test('Should call cpf-check validate method with valid cpf', async () => {
    const sut = new CpfValidatorAdapter()
    const validateSpy = jest.spyOn(CPF, 'validate')
    await sut.isCpfValid('valid_cpf')
    expect(validateSpy).toHaveBeenCalledWith('valid_cpf')
  })
})
