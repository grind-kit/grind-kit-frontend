import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Navigation() {
  const { user } = useAuthContext();

  return (
    <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
      <Link legacyBehavior href="/">
        <a className="text-4xl font-bold text-blue-500">Grind Kit</a>
      </Link>
      <nav className="ml-auto">
        {user !== null ? (
          <>
            <Link legacyBehavior href="/jobs">
              <a className="mr-5">Grind</a>
            </Link>
            <Link legacyBehavior href="/profile">
              <a className="mr-5">Profile</a>
            </Link>

            <div
              className="inline-block cursor-pointer mr-5"
              onClick={() => signOut}
            >
              Sign Out
            </div>
          </>
        ) : (
          <>
            <Link legacyBehavior href="/signin">
              <a className="mr-5">Sign In</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
