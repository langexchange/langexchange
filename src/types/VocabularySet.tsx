import User from "./User";
import Vocabulary from "./Vocabulary";

export default interface VocabularySet {
  id: string;
  owner: User;
  termLanguage: string;
  definitionLanguage: string;
  createdAt: string;
  isPublic: boolean;
  title: string;
  description: string;
  image?: string;
  vocabularies: Vocabulary[];
}
