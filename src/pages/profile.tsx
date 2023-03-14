import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Profile({ user }: any) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-3 font-bold">Profile</h1>
      <div className="border w-14 mb-5"></div>
      <Image alt="User image" src={user.image} className="rounded-full mb-3" />
      <p className="text-xl">{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
