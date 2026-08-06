import SignupForm from '@/app/ui/signup-form';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-100 p-4">
        <SignupForm />
      </div>
    </main>
  );
}