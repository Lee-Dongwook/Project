'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { InvoiceForm } from '@/src/types';

export const fetchInvoiceById = async (id: string) => {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
        SELECT
          invoices.id,
          invoices.customer_id,
          invoices.amount,
          invoices.status
        FROM invoices
        WHERE invoices.id = ${id};
      `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
};
