export type ResponseStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';
export interface HelpResponse {
  id: number; postId: number; postTitle: string; postOwnerName: string;
  responderName: string; responderEmail: string; message: string; status: ResponseStatus;
  received: boolean; canWithdraw: boolean; createdAt: string; updatedAt: string;
}
