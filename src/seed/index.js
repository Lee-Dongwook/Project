import db from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/sampleData';
import bcrypt from 'bcrypt';

const seedUsers = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    const insertUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`${insertUsers.length} users inserted`);

    return {
      createTable,
      users: insertUsers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const seedInvoices = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "invoices" table`);

    const insertInvoices = await Promise.all(
      invoices.map(
        (invoice) =>
          client.sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`${insertInvoices.length} invoices inserted`);

    return {
      createTable,
      invoices: insertInvoices,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const seedCustomers = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    const insertCustomers = await Promise.all(
      customers.map(
        (customer) =>
          client.sql`
          INSERT INTO customers (id, name, email, image_url)
          VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`${insertCustomers.length} customers inserted`);

    return {
      createTable,
      customers: insertCustomers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const seedRevenue = async (client) => {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    const insertRevenue = await Promise.all(
      revenue.map(
        (revenueItem) =>
          client.sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${revenueItem.month}, ${revenueItem.revenue})
          ON CONFLICT (month) DO NOTHING;
        `,
      ),
    );

    console.log(`${insertRevenue.length} revenue entries inserted`);

    return {
      createTable,
      revenue: insertRevenue,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const main = async () => {
  const client = await db.connect();

  try {
    await seedUsers(client);
    await seedInvoices(client);
    await seedCustomers(client);
    await seedRevenue(client);
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.end();
  }
};

main().catch((error) => console.error('Unexpected error:', error));
