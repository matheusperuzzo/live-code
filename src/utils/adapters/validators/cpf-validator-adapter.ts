import { CpfValidator } from '@cpf-validator'
import CPF from 'cpf-check'

export class CpfValidatorAdapter implements CpfValidator {
  async isCpfValid (cpf: string): Promise<boolean> {
    const isValid = CPF.validate(cpf)
    return isValid
  }
}
