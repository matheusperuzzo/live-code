import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http/http'
import { EmailValidator } from '../../protocols/validators/email-validator'
import { TelephoneValidator } from '../../protocols/validators/telephone-validator'
import { CpfValidator } from '../../protocols/validators/cpf-validator'
import { AddAccount } from '../../../domain/account/add-account'

export class SignUpController {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly telephoneValidator: TelephoneValidator,
    private readonly cpfValidator: CpfValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const isTelephoneValid = await this.telephoneValidator.isTelephoneValid(httpRequest.body.telephone)
      if (!isTelephoneValid) {
        return badRequest(new InvalidParamError('telephone'))
      }
      const isCpfValid = await this.cpfValidator.isCpfValid(httpRequest.body.cpf)
      if (!isCpfValid) {
        return badRequest(new InvalidParamError('cpf'))
      }
      const {
        name,
        email,
        password,
        telephone,
        birthDate,
        mothersName,
        cpf
      } = httpRequest.body
      await this.addAccount.add({
        name,
        email,
        password,
        telephone,
        birthDate,
        mothersName,
        cpf
      })
      return {
        statusCode: 0,
        body: null
      }
    } catch (err) {
      return serverError(new ServerError(err))
    }
  }
}
