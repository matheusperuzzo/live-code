import { EmailValidator } from '@presentation/protocols/signup/validators'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  async isEmailValid (email: string): Promise<boolean> {
    validator.isEmail(email)
    return await new Promise(resolve => resolve(true))
  }
}
