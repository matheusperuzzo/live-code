import { ServerError } from '../errors/server-error'
import { httpResponse } from '../protocols/http/http'

export const badRequest = (error: Error): httpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): httpResponse => {
  return {
    statusCode: 400,
    body: new ServerError(error.stack ? error.stack : '')
  }
}
