import { Hasher } from '@root/src/data/protocols/cryptography/hasher'
import argon from 'argon2'

export class Argon2Adapter implements Hasher {
  async hash (value: string): Promise<string> {
    await argon.hash(value)
    return 'hash'
  }
}
