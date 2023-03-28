import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { User } from "@/pages/api/api-client";
// import { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { auth } from "@/firebase/firebase";
import { parseCookies } from "nookies";

const DashboardPage = () => {
  // const [userData, setUserData] = useState<any>(null);
  // const { user } = useAuth();

  // const fetchUserData = async () => {
  //   const token = await auth.currentUser?.getIdToken();

  //   if (user && token) {
  //     const res = User.getUserInfo(user.uid, token);
  //     setUserData(res);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto text-slate-900">
        <div className="px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Character Stats</h2>
          <Link legacyBehavior href="/dashboard/settings">
            <a className="hover:underline">Character Settings</a>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

export async function getServerSideProps(context: any) {
  const { uid, token } = parseCookies(context);

  // const response = await User.getUserInfo(uid, token);

  console.log("uid", uid);
  console.log("token", token);

  return {
    props: {
    },
  };
}
