import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, serverError } from '../../helpers/http-helper'
import { HttpRequest, httpResponse } from '../../protocols/http/http'
import { EmailValidator } from '../../protocols/validators/email-validator'
import { TelephoneValidator } from '../../protocols/validators/telephone-validator'

export class SignUpController {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly telephoneValidator: TelephoneValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    try {
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
      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      await this.telephoneValidator.isTelephoneValid(httpRequest.body.telephone)
      return {
        statusCode: 0,
        body: null
      }
    } catch (err) {
      return serverError(new ServerError(err))
    }
  }
}
