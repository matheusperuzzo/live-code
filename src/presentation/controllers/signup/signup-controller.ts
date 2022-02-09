import { HttpRequest, httpResponse } from '../../protocols/http/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new Error('Missing param: password')
      }
    }
    return {
      statusCode: 0,
      body: null
    }
  }
}
