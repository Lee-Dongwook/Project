import { Metadata } from 'next';

import { InvoiceCreateForm } from '@/src/components/InvoiceCreateForm';
import { Breadcrumbs } from '@/src/common/breadcrumb';
import { fetchCustomers } from '@/src/hooks/fetchCustomers';

export const metadata: Metadata = {
  title: 'New Invoice',
};

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <InvoiceCreateForm customers={customers} />
    </main>
  );
}
