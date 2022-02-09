import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, httpResponse } from '../../protocols/http/http'
import { EmailValidator } from '../../protocols/validators/email-validator'

export class SignUpController {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
      'telephone',
      'birthDate',
      'mothersName',
      'cpf'
    ]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const isEmailValid = await this.emailValidator.isEmailValid(httpRequest.body.email)
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }
    return {
      statusCode: 0,
      body: null
    }
  }
}
