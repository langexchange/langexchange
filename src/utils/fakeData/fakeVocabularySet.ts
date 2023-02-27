import { faker } from "@faker-js/faker";
import User from "../../types/User";
import VocabularySet from "../../types/VocabularySet";
import { fakeUser } from "./fakeUser";
import { fakeVocabularies } from "./fakeVocabulary";

export const fakeVocabularySet = () => {
  const vocabularies = fakeVocabularies(Number(faker.random.numeric(2)));
  const user: User = fakeUser();

  const item: VocabularySet = {
    id: faker.database.mongodbObjectId().toString(),
    owner: user,
    title: faker.random.words(4),
    description: faker.random.words(10),
    vocabularies: vocabularies,
    termLanguage: faker.random.locale(),
    definitionLanguage: faker.random.locale(),
    createdAt: faker.date.past().toLocaleString(),
    isPublic: Number(faker.random.numeric()) % 2 === 0,
    image:
      Number(faker.random.numeric()) % 2 === 0
        ? faker.image.imageUrl()
        : undefined,
  };

  return item;
};

export const fakeVocabularySets = (number: number = 2) => {
  const sets: VocabularySet[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakeVocabularySet();
    sets.push(item);
  }

  return sets;
};
