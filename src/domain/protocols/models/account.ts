export interface AddAccountModel {
  name: string
  email: string
  password: string
  telephone: string
  birthDate: string
  mothersName: string
  cpf: string
}

export interface AccountModel {
  id: number
  name: string
  email: string
  password: string
  telephone: string
  birthDate: Date
  mothersName: string
  cpf: string
}
