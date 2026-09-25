import type { ReactNode } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return children;
  }

  return (
    <div className="admin-shell min-h-screen lg:flex">
      <aside className="bg-navy-deep p-6 text-cream lg:min-h-screen lg:w-72 lg:shrink-0 lg:p-8">
        <p className="font-serif text-2xl">Motoride admin</p>
        <p className="mt-1 text-sm text-gold">{session.user.email}</p>
        <nav className="mt-8 flex flex-wrap gap-2 text-base lg:flex-col">
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
      <div className="min-w-0 flex-1 px-5 py-10 sm:px-8 lg:p-12">{children}</div>
    </div>
  );
}
