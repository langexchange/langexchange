import Post from "./Post";
import VocabularySet from "./VocabularySet";

export default interface User {
  id: string;
  fullname: string;
  email?: string;
  nativeLanguages?: string[];
  targetLanguages?: string[];
  interests?: string[];
  bio?: string;
  avatar?: string;
  VocabularySets?: VocabularySet[];
  Posts?: Post[];
}
