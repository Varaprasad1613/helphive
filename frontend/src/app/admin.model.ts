import { HelpPost } from './help-post.model';

export interface AdminOverview { users: number; activeUsers: number; posts: number; responses: number; pendingResponses: number; }
export interface AdminUser {
  id: number; name: string; email: string; role: 'MEMBER' | 'ADMIN'; emailVerified: boolean;
  active: boolean; postCount: number; createdAt: string;
}
export type AdminPost = HelpPost;
