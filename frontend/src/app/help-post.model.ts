export type Category = 'EDUCATION' | 'TECHNOLOGY' | 'HOME_AND_GARDEN' | 'TRANSPORTATION' | 'WELLNESS' | 'OTHER';
export type PostType = 'REQUEST' | 'OFFER';
export type PostStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';

export interface HelpPost {
  id: number;
  title: string;
  description: string;
  authorName: string;
  contact: string | null;
  location: string;
  category: Category;
  type: PostType;
  status: PostStatus;
  ownerId: number | null;
  ownedByCurrentUser: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HelpPostInput {
  title: string;
  description: string;
  location: string;
  category: Category;
  type: PostType;
}

export interface PostStats {
  total: number;
  open: number;
  offers: number;
  requests: number;
  completed: number;
}
