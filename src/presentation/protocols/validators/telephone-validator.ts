export interface TelephoneValidator {
  isTelephoneValid: (telephone: string) => Promise<boolean>
}
