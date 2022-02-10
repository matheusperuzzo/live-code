import argon from 'argon2'
import { Argon2Adapter } from './argon2-adapter'

describe('Argon2Adapter', () => {
  test('Should call Argon2 hash method with valid password', async () => {
    const sut = new Argon2Adapter()
    const hashSpy = jest.spyOn(argon, 'hash')
    await sut.hash('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Argon2 throws', async () => {
    const sut = new Argon2Adapter()
    jest.spyOn(argon, 'hash')
      .mockImplementationOnce(
        () => {
          throw new Error()
        }
      )
    const promise = sut.hash('valid_password')
    await expect(promise).rejects.toThrow()
  })
})
