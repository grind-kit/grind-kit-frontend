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
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const cookiesToRemove: Array<string> = [];
  // 10 seconds
  const tokenRefreshThreshold = 10 * 1000;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set the user in the context
        setUser({
          email: user.email,
          uid: user.uid,
        });

        console.log(user, "user");

        // Handle token refresh
        const tokenRefreshTimeout = setTimeout(async () => {
          console.log("Running token refresh");

          // Payload for our API
          const userData = {
            username: user.uid,
          };

          const response = await User.refreshIdToken(userData);

          console.log(response);
        }, tokenRefreshThreshold);

        return () => clearTimeout(tokenRefreshTimeout);
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Initialize tokens

      const idToken = await userCredential.user.getIdToken();
      const refreshToken = await userCredential.user.refreshToken;
      
      // Initialize data to be stored in our API
      const userData = {
        username: userCredential.user.uid,
        email: email,
        password: password,
        idToken: idToken,
        refreshToken: refreshToken,
      };
      
      // Store the idToken in sessionStorage
      sessionStorage.setItem("idToken", idToken);
      
      // Send relevant data to our API
      await User.postUser(userData);

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
    cookiesToRemove.forEach((cookie) => destroyCookie(null, cookie));

    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
