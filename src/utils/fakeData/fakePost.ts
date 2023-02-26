import { faker } from "@faker-js/faker";
import User from "../../types/User";
import Comment from "../../types/Comment";
import Post from "../../types/Post";
import { fakeUser } from "./fakeUser";
import { fakeComments } from "./fakeComment";

export const fakePost = () => {
  const user: User = fakeUser();
  const comments: Comment[] = fakeComments(10);

  const item: Post = {
    id: faker.database.mongodbObjectId().toString(),
    owner: user,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toLocaleString(),
    numHearts: Number(faker.random.numeric(2)),
    numComments: Number(faker.random.numeric(2)),
    images: [faker.image.people(), faker.image.nature(), faker.image.city()],
    topics: [faker.random.word(), faker.random.word(), faker.random.word()],
    comments: comments,
    languages: [faker.random.word(), faker.random.word(), faker.random.word()],
  };

  return item;
};

export const fakePosts = (number: number = 2) => {
  const sets: Post[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakePost();
    sets.push(item);
  }

  return sets;
};
