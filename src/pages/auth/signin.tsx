import React from "react";
import { signIn, getProviders } from "next-auth/react";

interface InputWrapperProps {
  providers: any;
  children?: React.ReactNode;
}

export default function SignIn({ providers }: InputWrapperProps) {
  return (
    <div className="flex flex-col">
      <>
        <h1 className="mb-5 text-center text-3xl font-bold">Sign in to Grind Kit</h1>
        {Object.values(providers).map((provider: any) => {
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600"
            >
              Sign in with {provider.name}
            </button>
          </div>;
        })}
      </>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  console.log("Providers:", providers)
  return {
    props: { providers },
  };
}
