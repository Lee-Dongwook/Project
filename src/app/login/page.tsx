import { Metadata } from 'next';

import { Logo } from '@/src/common/icon';
import { LoginForm } from '@/src/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center border-2">
      <div className="relative mx-auto -mt-16 flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-36 w-full items-end rounded-lg bg-blue-500 p-3">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
