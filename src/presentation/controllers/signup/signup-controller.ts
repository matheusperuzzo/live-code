import { badRequest } from '../../helpers/http-helper'
import { HttpRequest, httpResponse } from '../../protocols/http/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'telephone']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(field)
      }
    }
    return {
      statusCode: 0,
      body: null
    }
  }
}
