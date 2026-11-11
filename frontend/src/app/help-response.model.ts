export type ResponseStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';
export interface HelpResponse {
  id: number; postId: number; postTitle: string; postOwnerName: string; postOwnerId: number | null;
  responderName: string; responderId: number; responderEmail: string | null; message: string; status: ResponseStatus;
  received: boolean; canWithdraw: boolean; createdAt: string; updatedAt: string;
}
