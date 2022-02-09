import { MissingParamError } from '../errors/missing-param-error'
import { httpResponse } from '../protocols/http/http'

export const badRequest = (paramName: string): httpResponse => {
  return {
    statusCode: 400,
    body: new MissingParamError(paramName)
  }
}
