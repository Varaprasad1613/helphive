export type PostProgressUpdateType = 'COMMENT' | 'NOTE';

export interface PostProgressUpdate {
  id: number;
  parentId: number | null;
  type: PostProgressUpdateType;
  content: string;
  authorName: string;
  authorId: number;
  createdAt: string;
}

export interface PostDiscussion {
  updates: PostProgressUpdate[];
  commentsOpen: boolean;
  canPostNote: boolean;
}

export interface PostProgressUpdateInput {
  type: PostProgressUpdateType;
  content: string;
  parentId?: number;
}
