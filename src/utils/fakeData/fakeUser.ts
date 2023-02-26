import { faker } from "@faker-js/faker";
import User from "../../types/User";

export const fakeUser = () => {
  const user: User = {
    id: faker.database.mongodbObjectId().toString(),
    fullname: faker.name.fullName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    nativeLanguages: [faker.random.locale(), faker.random.locale()],
    targetLanguages: [faker.random.locale(), faker.random.locale()],
    interests: [faker.random.word(), faker.random.word(), faker.random.word()],
    bio: faker.lorem.paragraph(),
  };

  return user;
};

export const fakeUsers = (number: number = 2) => {
  const sets: User[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakeUser();
    sets.push(item);
  }

  return sets;
};
