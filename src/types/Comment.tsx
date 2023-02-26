import User from "./User";

export default interface Comment {
  id: string;
  owner: User;
  content: string;
  createdAt: string;
  numHearts: number;
  type: "normal" | "corrected";
}
