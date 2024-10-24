'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';

interface DeleteInvoiceProps {
  id: string;
}

export const deleteInvoice = async ({ id }: DeleteInvoiceProps) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices/');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    console.error('Failed to delete invoice:', error);
    return {
      message: 'Database Error: Failed to Delete Invoice',
    };
  }
};
