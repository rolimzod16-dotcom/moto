import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="font-serif text-4xl">Pamir Moto</h1>
      <p className="mt-2 text-lg">Вход в админку</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
