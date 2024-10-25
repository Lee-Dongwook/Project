import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { InvoiceEditForm } from '@/src/components/InvoiceEditForm';
import { Breadcrumbs } from '@/src/common/breadcrumb';
import { fetchCustomers } from '@/src/hooks/fetchCustomers';
import { fetchInvoiceById } from '@/src/hooks/fetchInvoiceById';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <InvoiceEditForm invoice={invoice} customers={customers} />
    </main>
  );
}
