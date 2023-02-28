import { faker } from "@faker-js/faker";
import Notification from "../../types/Notification";

export const fakeNotification = () => {
  const item: Notification = {
    id: faker.database.mongodbObjectId().toString(),
    title: faker.random.words(4),
    description: faker.random.words(10),
    createdAt: faker.date.past().toLocaleString(),
    image: faker.image.imageUrl(),
    read: Number(faker.random.numeric()) % 2 === 0,
  };

  return item;
};

export const fakeNotifications = (number: number = 2) => {
  const sets: Notification[] = [];

  for (let i = 0; i < number; i++) {
    const item = fakeNotification();
    sets.push(item);
  }

  return sets;
};
