import { EmailValidator } from '@presentation/protocols/validators'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  async isEmailValid (email: string): Promise<boolean> {
    const isValid = validator.isEmail(email)
    return isValid
  }
}
