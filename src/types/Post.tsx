import Comment from "./Comment";
import User from "./User";

export default interface Post {
  id: string;
  owner: User;
  content: string;
  createdAt: string;
  images?: string[];
  topics?: string[];
  numHearts: number;
  numComments: number;
  comments: Comment[];
  languages: string[];
}
