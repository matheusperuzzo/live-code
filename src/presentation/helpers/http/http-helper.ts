import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: new ServerError(error.stack ? error.stack : '')
  }
}