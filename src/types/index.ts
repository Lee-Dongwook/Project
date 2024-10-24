export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  image_url: string;
}

export interface Invoice {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
}

export interface Revenue {
  month: string;
  revenue: number;
}

export interface LatestInvoice {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
}

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export interface InvoicesTable {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
}

export interface CustomersTable {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
}

export interface FormattedCustomersTable {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}

export interface CustomerField {
  id: string;
  name: string;
}

export interface State {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}
