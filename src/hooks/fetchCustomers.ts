'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { CustomerField } from '../types';

export const fetchCustomers = async () => {
  noStore();

  try {
    const data = await sql<CustomerField>`
        SELECT
          id,
          name
        FROM customers
        ORDER BY name ASC
        `;

    const customers = data.rows;
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
};
