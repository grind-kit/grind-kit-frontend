import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
      <Link legacyBehavior href="/">
        <a className="text-4xl font-bold text-blue-500">Grind Kit</a>
      </Link>
      <nav className="ml-auto">
        {session && session.accessToken ? (
          <>
            <Link legacyBehavior href="/profile">
              <a className="mr-5">Profile</a>
            </Link>
            <div
              className="inline-block cursor-pointer mr-5"
              onClick={() => signOut()}
            >
              Sign Out
            </div>
          </>
        ) : (
          <>
            <div
              className="inline-block cursor-pointer mr-5"
              onClick={() => signIn()}
            >
              Sign In
            </div>
          </>
        )}
        <Link legacyBehavior href="/play">
          <a className="mr-5">Play</a>
        </Link>
      </nav>
    </header>
  );
}
