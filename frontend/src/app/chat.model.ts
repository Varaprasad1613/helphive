export interface ChatKeyRecord {
  userId: number;
  publicKey: string;
  encryptedPrivateKey: string | null;
  salt: string | null;
  iv: string | null;
}

export interface ChatRequest {
  id: number;
  requesterId: number;
  requesterName: string;
  recipientId: number;
  recipientName: string;
  postId: number | null;
  postTitle: string | null;
  responseId: number | null;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED';
  createdAt: string;
}

export interface ChatConversation {
  id: number;
  peerId: number;
  peerName: string;
  postId: number | null;
  postTitle: string | null;
  encryptedKeyEnvelope: string;
  updatedAt: string;
}

export interface EncryptedChatMessage {
  id: number;
  senderId: number;
  ciphertext: string;
  iv: string;
  createdAt: string;
}

export interface ChatMessage extends EncryptedChatMessage {
  plaintext: string;
}

export interface ChatBlock {
  userId: number;
  name: string;
  blockedAt: string;
}

export interface ChatReport {
  id: number;
  conversationId: number;
  reporterId: number;
  reporterName: string;
  reportedUserId: number;
  reportedUserName: string;
  reason: string;
  optionalEvidence: string | null;
  status: 'OPEN' | 'REVIEWED' | 'DISMISSED';
  createdAt: string;
}

export interface ChatKeyUpload {
  publicKey: string;
  encryptedPrivateKey: string;
  salt: string;
  iv: string;
}
