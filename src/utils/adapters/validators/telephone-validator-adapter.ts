import { TelephoneValidator } from '@presentation/protocols/signup/validators'
import validator from 'validator'

export class TelephoneValidatorAdapter implements TelephoneValidator {
  async isTelephoneValid (telephone: string): Promise<boolean> {
    validator.isMobilePhone(telephone)
    return await new Promise(resolve => resolve(false))
  }
}
