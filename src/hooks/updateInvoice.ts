'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import type { State } from '@/src/types';
import { FormSchema } from '@/src/lib/formSchema';

interface UpdateInvoiceProps {
  id: string;
  prevState?: State;
  formData: FormData;
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export const updateInvoice = async ({
  id,
  prevState,
  formData,
}: UpdateInvoiceProps) => {
  const validateFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update invoice',
    };
  }

  const { customerId, amount, status } = validateFields.data;

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;

    if (prevState) {
      prevState.message = 'Invoice updated successfully!';
    }

    revalidatePath('/dashboard/invoices');
    redirect(`/dashboard/invoices`);
  } catch (error) {
    console.error(error);

    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
};
