import { supabase } from './supabaseClient';
import { AcademicDocument, DocumentStatus } from '../types';

export const documentService = {
  async getAllDocuments(): Promise<AcademicDocument[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Log the actual message, not just the object
        console.error('Error fetching documents:', error.message || error);
        return [];
      }

      if (!data) return [];

      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        studentId: d.student_id,
        studentName: d.student_name,
        issueDate: d.issue_date,
        status: d.status as DocumentStatus,
        description: d.description,
        ipfsHash: d.ipfs_hash,
        transactionId: d.transaction_id,
        policyId: d.policy_id,
        assetName: d.asset_name
      }));
    } catch (err) {
      console.error('Unexpected error in getAllDocuments:', err);
      return [];
    }
  },

  async createDocument(doc: Omit<AcademicDocument, 'id' | 'status' | 'transactionId'>): Promise<AcademicDocument> {
    const dbPayload = {
      title: doc.title,
      student_id: doc.studentId,
      student_name: doc.studentName,
      issue_date: doc.issueDate,
      description: doc.description,
      status: DocumentStatus.DRAFT
    };

    const { data, error } = await supabase
      .from('documents')
      .insert([dbPayload])
      .select()
      .single();

    if (error) {
      console.error('Error creating document:', error.message || error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      studentId: data.student_id,
      studentName: data.student_name,
      issueDate: data.issue_date,
      status: data.status,
      description: data.description
    };
  },

  async mintDocument(docId: string): Promise<string> {
    // 1. Update status to MINTING
    const { error: updateError } = await supabase
      .from('documents')
      .update({ status: DocumentStatus.MINTING })
      .eq('id', docId);

    if (updateError) {
      console.error('Error updating status to MINTING:', updateError.message);
      throw updateError;
    }

    try {
      // TODO: Implement real minting process
      // This should call your backend API that handles:
      // 1. Upload document to IPFS
      // 2. Create Cardano transaction
      // 3. Mint NFT with appropriate metadata
      // 4. Return transaction ID and IPFS hash
      //
      // Example:
      // const response = await fetch('/api/mint', {
      //   method: 'POST',
      //   body: JSON.stringify({ docId }),
      // });
      // const { transactionId, ipfsHash } = await response.json();

      throw new Error(
        'Minting backend not configured. ' +
        'Please implement a backend API to handle IPFS upload and Cardano minting. ' +
        'See documentService.ts for implementation notes.'
      );

      // When real implementation is ready, uncomment and update this:
      // const { error: finalUpdateError } = await supabase
      //   .from('documents')
      //   .update({ 
      //     status: DocumentStatus.MINTED,
      //     transaction_id: transactionId,
      //     ipfs_hash: ipfsHash
      //   })
      //   .eq('id', docId);
      //
      // if (finalUpdateError) throw finalUpdateError;
      // return transactionId;

    } catch (e: any) {
      console.error('Minting failed:', e);
      await supabase
        .from('documents')
        .update({ status: DocumentStatus.FAILED })
        .eq('id', docId);
      throw e;
    }
  }
};