import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { User } from "@/api/api-client";
import { destroyCookie } from "nookies";

interface UserType {
  email: string | null;
  uid: string | null;
}

interface ContextType {
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: UserType;
}

// If the context is not initialized, throw an error

const AuthContext = createContext<ContextType>({
  signUp: async () => {
    throw new Error("AuthContext not initialized");
  },
  logIn: async () => {
    throw new Error("AuthContext not initialized");
  },
  logOut: async () => {
    throw new Error("AuthContext not initialized");
  },
  user: { email: null, uid: null },
});

export const useAuth = () => useContext<ContextType>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  const cookiesToRemove: Array<string> = [
    "token",
    "uid",
    "authenticated",
    "lodestoneId",
    "id",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  // const setAuthCookie = (name: string, value: string) => {
  //   setCookie(null, name, value, {
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7, // 1 week
  //   });
  // };

  const signUp = async (email: string, password: string) => {
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      // Initialize data for our API
      const userData = {
        username: userCredential.user.uid,
        email: email,
        password: password,
      };

      // Send relevant data to our API
      const response = await User.postUser(userData, token);

      console.log(response);

      // Set cookies for the user


      // Return the userCredential object from Firebase
      return userCredential;
    } catch (error) {
      console.error(error);

      // Throw the error from Firebase
      throw error;
    }
  };

  const logIn = async (email: string, password: string) => {

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });

    // Remove all cookies
    cookiesToRemove.forEach((cookie: string) => destroyCookie(null, cookie));

    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
