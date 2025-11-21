export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  institutionName?: string;
  website?: string;
  displayName?: string; // Used for UI display
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  graduationYear: number;
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  MINTING = 'MINTING',
  MINTED = 'MINTED',
  FAILED = 'FAILED',
}

export interface AcademicDocument {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  ipfsHash?: string;
  transactionId?: string; // Cardano Tx Hash
  policyId?: string;
  assetName?: string;
  status: DocumentStatus;
  description?: string;
  fileUrl?: string;
}

export interface SchoolProfile {
  name: string;
  website: string;
  email: string;
  address: string;
  logoUrl?: string;
  issuerDid?: string;
}

export interface AppSettings {
  autoMint: boolean;
  emailNotifications: boolean;
  cardanoNetwork: 'mainnet' | 'preprod' | 'preview';
  ipfsGateway: string;
}

export type Language = 'fr' | 'en' | 'sw';

export type Theme = 'light' | 'dark';