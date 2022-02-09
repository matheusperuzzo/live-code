import { CpfValidator } from '@cpf-validator'
import CPF from 'cpf-check'

export class CpfValidatorAdapter implements CpfValidator {
  async isCpfValid (cpf: string): Promise<boolean> {
    CPF.validate(cpf)
    return await new Promise(resolve => resolve(false))
  }
}
