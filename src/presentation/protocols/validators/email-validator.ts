export interface EmailValidator {
  isEmailValid: (email: string) => Promise<boolean>
}
