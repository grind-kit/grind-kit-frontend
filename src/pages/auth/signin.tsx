import type { NextPage } from "next";
import { initFirebase } from "@/firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const SignIn: NextPage = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useAuthState(auth);
  const router = useRouter();

  if (user) {
    router.push("/profile");
    return (
      <div>
        <h1>Welcome {user.displayName}</h1>
      </div>
    );
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <div className="text-center flex flex-col gap-4 items-center">
      <div>
        <h1>Please sign in to continue</h1>
      </div>
      <div>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 text-white rounded-md p-2 w-48"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;