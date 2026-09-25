import type { ReactNode } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return children;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-navy-deep p-5 text-cream">
        <p className="font-serif text-2xl">Motoride admin</p>
        <p className="mt-1 text-sm text-gold">{session.user.email}</p>
        <nav className="mt-8 flex flex-col gap-3 text-lg">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/requests">Requests</Link>
          <Link href="/admin/availability">Availability</Link>
          <Link href="/admin/fleet">Fleet</Link>
          <Link href="/en" className="text-gold">
            View site
          </Link>
        </nav>
        <form
          className="mt-10"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="btn btn-light w-full" type="submit">
            Sign out
          </button>
        </form>
      </aside>
      <div className="min-w-0 flex-1 p-8">{children}</div>
    </div>
  );
}
