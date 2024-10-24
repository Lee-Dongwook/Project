'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { FormSchema } from '@/src/lib/formSchema';
import type { State } from '@/src/types';

interface CreateInvoiceProps {
  prevState?: State;
  formData: FormData;
}

const CreateInvoiceSchema = FormSchema.omit({ id: true, date: true });

export const createInvoice = async ({ formData }: CreateInvoiceProps) => {
  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create invoice',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;

  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
     INSERT INTO invoices (customer_id, amount, status, date)
     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error(error);

    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};
