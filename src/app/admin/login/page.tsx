import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="font-serif text-4xl">Pamir Motoride</h1>
      <p className="mt-2 text-lg">Administrator sign in</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
