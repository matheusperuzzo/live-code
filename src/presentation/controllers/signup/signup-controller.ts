import { HttpRequest, httpResponse } from '../../protocols/http/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<httpResponse> {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
