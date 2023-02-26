import { faker } from "@faker-js/faker";
import Vocabulary from "../../types/Vocabulary";

export const fakeVocabulary = () => {
  const item: Vocabulary = {
    id: faker.database.mongodbObjectId().toString(),
    term: faker.lorem.word(),
    define: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
  };

  return item;
};

export const fakeVocabularies = (number: number = 2) => {
  const vocabularies: Vocabulary[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakeVocabulary();
    vocabularies.push(item);
  }

  return vocabularies;
};
