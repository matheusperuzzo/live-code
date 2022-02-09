export interface CpfValidator {
  isCpfValid: (cpf: string) => Promise<boolean>
}
