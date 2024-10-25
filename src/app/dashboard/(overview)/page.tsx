import { Metadata } from 'next';

import { lusitana } from '@/src/assets/font/font';
import { CardWrapper } from '@/src/common/card';
import { RevenueChart } from '@/src/components/RevenueChart';
import { LatestInvoices } from '@/src/components/LatestInvoices';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function DashboardPage() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart />
        <LatestInvoices />
      </div>
    </main>
  );
}
