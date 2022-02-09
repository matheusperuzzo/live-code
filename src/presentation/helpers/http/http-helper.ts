import { ServerError } from '@presentation/errors/server-error'
import { HttpResponse } from '@presentation/protocols/http'

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

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 400,
    body: data
  }
}
