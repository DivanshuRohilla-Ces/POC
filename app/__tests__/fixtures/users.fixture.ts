import { faker } from '@faker-js/faker';
import { Users } from '../../../services/types';

export function makeUser(overrides: Partial<Users> = {}): Users {
  return {
    id: faker.number.int({ min: 1, max: 1_000_000_000 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'editor', 'viewer']),
    age: faker.number.int({ min: 18, max: 80 }),
    address: {
      address: faker.location.streetAddress(),
      city: 'Phoenix',
      state: faker.location.state(),
      stateCode: faker.location.state({ abbreviated: true }),
      postalCode: '29112',
      coordinates: {},
      country: faker.location.country(),
    },
    bank: {
      cardExpire: faker.date.future().toLocaleDateString(),
      cardNumber: faker.finance.creditCardNumber(),
      cardType: faker.finance.creditCardIssuer(),
      currency: faker.finance.currencyCode(),
      iban: faker.finance.iban(),
    },
    birthDate: faker.date.birthdate().toISOString(),
    bloodGroup: faker.helpers.arrayElement(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']),
    company: {
      name: faker.company.name(),
      title: faker.person.jobTitle(),
      department: faker.commerce.department(),
    },
    crypto: {
      coin: faker.finance.bitcoinAddress(),
      wallet: faker.finance.ethereumAddress(),
      network: 'bitcoin',
    },
    ein: faker.string.numeric(9),
    eyeColor: faker.helpers.arrayElement(['blue', 'brown', 'green', 'hazel']),
    gender: faker.helpers.arrayElement(['male', 'female']),
    hair: {
      color: faker.helpers.arrayElement(['black', 'brown', 'blonde', 'red']),
      type: faker.helpers.arrayElement(['straight', 'curly', 'wavy']),
    },
    height: faker.number.int({ min: 150, max: 200 }),
    image: faker.image.avatar(),
    ip: faker.internet.ipv4(),
    macAddress: faker.internet.mac(),
    maidenName: faker.person.lastName(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    university: faker.company.name(),
    userAgent: faker.internet.userAgent(),
    username: faker.internet.username(),
    weight: faker.number.int({ min: 50, max: 120 }),
    ...overrides,
  };
}

export const makeUserList = (count: number): Users[] => {
  return Array.from({ length: count }, () => makeUser());
};