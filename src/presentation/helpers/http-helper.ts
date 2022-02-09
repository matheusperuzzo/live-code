import { httpResponse } from '../protocols/http/http'

export const badRequest = (error: Error): httpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
