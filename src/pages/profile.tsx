import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="flex flex-col items-center">
      <p>Sign-in was successful</p>
    </div>
  );
}

// export async function getServerSideProps(context: any) {

// }
