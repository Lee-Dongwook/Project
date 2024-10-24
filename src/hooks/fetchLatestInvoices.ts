'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import type { LatestInvoiceRaw } from '@/src/types';
import { formatCurrency } from '../lib/formatCurrency';

export const fetchLatestInvoices = async () => {
  noStore();

  try {
    const data = await sql<LatestInvoiceRaw>`
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5
    `;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
};
