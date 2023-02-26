export default interface Notification {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  image?: string;
  read: boolean;
}
