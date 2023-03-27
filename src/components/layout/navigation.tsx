import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navigation() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <header className="container flex flex-row items-center mx-auto px-5 py-14 max-w-screen-lg">
      <Link legacyBehavior href="/">
        <a className="text-4xl font-bold text-blue-500">Grind Kit</a>
      </Link>
      <nav className="ml-auto text-slate-900">
        {user.uid ? (
          <>
            <Link legacyBehavior href="/jobs">
              <a className="mr-5 hover:underline">Grind</a>
            </Link>
            <Link legacyBehavior href="/dashboard">
              <a className="mr-5 hover:underline">Dashboard</a>
            </Link>

            <div className="inline-block cursor-pointer hover:underline" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link legacyBehavior href="/login">
              <a className="mr-5 hover:underline">Login</a>
            </Link>
            <Link legacyBehavior href="/signup">
              <a className="mr-5 hover:underline">Sign Up</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
