import signIn from '@/src/auth';

interface AuthenticateProps {
  prevState?: string;
  formData: FormData;
}

export const authenticate = async ({ formData }: AuthenticateProps) => {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
};
