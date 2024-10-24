import Image from 'next/image';
import { Status } from '@/src/common/status';
import { UpdateInvoice, DeleteInvoice } from '@/src/components/InvoiceButton';
import { formatDateToLocal } from '@/src/lib/formatDateToLocal';
import { formatCurrency } from '@/src/lib/formatCurrency';
import { fetchFilteredInvoice } from '@/src/hooks/fetchFilteredInvoices';

interface InvoiceTableProps {
  query: string;
  currentPage: number;
}

export const InvoiceTable = async ({
  query,
  currentPage,
}: InvoiceTableProps) => {
  const invoice = await fetchFilteredInvoice({ query, currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoice?.map((i) => (
              <div className="mb-2 w-full rounded-md bg-white p-4" key={i.id}>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={i.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${i.name}'s profile picture`}
                      />
                      <p>{i.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{i.email}</p>
                  </div>
                  <Status status={i.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(i.amount)}
                    </p>
                    <p>{formatDateToLocal(i.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={i.id} />
                    <DeleteInvoice id={i.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoice?.map((i) => (
                <tr
                  key={i.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={i.image_url}
                        alt={`${i.name}'s profile picture`}
                        className="rounded-full"
                        width={28}
                        height={28}
                      />
                      <p>{i.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{i.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(i.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(i.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={i.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={i.id} />
                      <DeleteInvoice id={i.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
