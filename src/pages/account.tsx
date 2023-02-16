import React from "react";
import {
  useSession,
  signOut,
  getSession,
  GetSessionParams,
} from "next-auth/react";

const account = () => {
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome {session?.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not signed in.</p>
      </div>
    );
  }
};

export default account;

export const getServerSideProps = async (
  context: GetSessionParams | undefined
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};
