import { Descendant } from 'slate';

export interface Document {
  id: string;
  title: string;
  content: Descendant[];
  parentId: string | null;
  childrenIds: string[];
}
