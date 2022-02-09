import { TelephoneValidator } from '@presentation/protocols/signup/validators'
import validator from 'validator'

export class TelephoneValidatorAdapter implements TelephoneValidator {
  async isTelephoneValid (telephone: string): Promise<boolean> {
    const isValid = validator.isMobilePhone(telephone)
    return isValid
  }
}
