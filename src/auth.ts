import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './authConfig';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

type User = {
  id: string;
  email: string;
  password: string;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Database query failed.');
  }
};

const isPasswordValid = async (
  inputPassword: string,
  storedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPassword);
};

const validateCredentials = (credentials: unknown) => {
  return z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(credentials);
};

export default NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'user@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = validateCredentials(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid credentials format', parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUserByEmail(email);

        if (!user) {
          console.log('User not found');
          return null;
        }

        const passwordMatch = await isPasswordValid(password, user.password);
        if (!passwordMatch) {
          console.log('Invalid password');
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
});
