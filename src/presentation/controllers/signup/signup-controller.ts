import { HttpRequest, httpResponse } from '../../protocols/http/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)
        }
      }
    }
    return {
      statusCode: 0,
      body: null
    }
  }
}
