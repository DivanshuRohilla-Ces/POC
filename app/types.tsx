export interface Users {
  address: Address
  age: number
  bank: Bank
  birthDate: string
  bloodGroup: string
  company: Company
  crypto: Crypto
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: Hair
  height: number
  id: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  password: string
  phone: string
  role: string
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

export interface Coordinates {}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address2
}

export interface Address2 {}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface Hair {
  color: string
  type: string
}

export interface UserListProps {
  users: Users[];
}
export interface SidebarProps {
  user: Users;
}
