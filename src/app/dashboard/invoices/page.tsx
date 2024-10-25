import { Metadata } from 'next';

import { lusitana } from '@/src/assets/font/font';
import { Pagination } from '@/src/components/Pagination';
import { Search } from '@/src/components/Search';
import { InvoiceTable } from '@/src/components/InvoiceTable';
import { CreateInvoice } from '@/src/components/InvoiceButton';
import { fetchInvoicesPages } from '@/src/hooks/fetchInvoicesPages';

export const metadata: Metadata = {
  title: 'Invoices',
};

interface InvoicesPageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function InvoicesPage({
  searchParams,
}: InvoicesPageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <InvoiceTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
