import { Metadata } from 'next';

import { fetchFilteredCustomers } from '@/src/hooks/fetchFilteredCustomers';
import { CustomerTable } from '@/src/components/CustomerTable';

export const metadata: Metadata = {
  title: 'Customers',
};

interface CustomersPageProps {
  searchParams: { query: string };
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return <CustomerTable customers={customers} />;
}
