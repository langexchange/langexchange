import { faker } from "@faker-js/faker";
import User from "../../types/User";
import Comment from "../../types/Comment";
import { fakeUser } from "./fakeUser";

export const fakeComment = () => {
  const user: User = fakeUser();

  const item: Comment = {
    id: faker.database.mongodbObjectId().toString(),
    owner: user,
    content: faker.random.words(10),
    createdAt: faker.date.past().toLocaleString(),
    numHearts: Number(faker.random.numeric(2)),
    type: Number(faker.random.numeric(2)) % 2 === 0 ? "normal" : "corrected",
  };

  return item;
};

export const fakeComments = (number: number = 2) => {
  const sets: Comment[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakeComment();
    sets.push(item);
  }

  return sets;
};
