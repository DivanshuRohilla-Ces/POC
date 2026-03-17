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
    image: faker.image.avatar(),

    ...overrides,
  };
}

export const makeUserList = (count: number): Users[] => {
  return Array.from({ length: count }, () => makeUser());
};