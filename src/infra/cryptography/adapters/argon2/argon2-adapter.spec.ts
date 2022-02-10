import argon from 'argon2'
import { Argon2Adapter } from './argon2-adapter'

describe('Argon2Adapter', () => {
  test('Should call Argon2 hash method with valid password', async () => {
    const sut = new Argon2Adapter()
    const hashSpy = jest.spyOn(argon, 'hash')
    await sut.hash('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })
})
