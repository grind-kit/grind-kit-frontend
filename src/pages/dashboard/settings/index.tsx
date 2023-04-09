import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { User } from "@/pages/api/api-client";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

type TCharacter = {
  Avatar: string;
  FeastMatches: number;
  ID: number;
  Lang: string;
  Name: string;
  Rank: number | null;
  RankIcon: string | null;
  Server: string;
};

type TSettingsPageProps = {
  servers: string[];
  token: string | undefined;
  uid: string;
};

interface SearchType {
  characterName: string;
  server: string;
}

export default function SettingsPage({
  servers,
  token,
  uid,
}: TSettingsPageProps) {
  const methods = useForm<SearchType>({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [character, setCharacter] = useState<TCharacter | null>(null);

  const onSubmit = async (data: SearchType) => {
    const { characterName, server } = data;
    const response = await axios.get(
      `https://xivapi.com/character/search?name=${characterName}&server=${server}&private_key=${process.env.XIVAPI_KEY}`
    );
    setCharacter(response.data.Results[0]);
  };

  const handleSave = async () => {
    await User.putUserInfo(uid, token, character?.ID);
  };

  return (
    <ProtectedRoute>
      <div className="settings-form container mx-auto w-96 my-12 border-2 rounded-md border-gray-200">
        <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-500">
          Settings
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-80 mx-auto pb-12 px-4"
          >
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="characterName"
                  className="block mb-3 font-sans text-blue-500"
                >
                  Character Name
                </label>
              </div>

              <input
                inputMode="text"
                id="characterName"
                className={`border border-solid rounded-md ring:0 focus:ring-0 focus:outline-none border-gray-200 text-slate-900 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                {...register("characterName", {
                  required: "Name is required",
                  minLength: { value: 4, message: "Name is too short" },
                  maxLength: { value: 20, message: "Name is too long" },
                })}
              />
              {errors.characterName && (
                <p className="text-red-500">{errors.characterName.message}</p>
              )}
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="server"
                  className="block mb-3 font-sans text-blue-500"
                >
                  Server
                </label>
              </div>

              <select
                id="server"
                className={`border border-solid rounded-md ring:0 focus:ring-0 focus:outline-none border-gray-200 text-slate-900 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
                {...register("server", {
                  required: "Server is required",
                })}
              >
                {servers.map((server: string) => (
                  <option key={server} value={server}>
                    {server}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className={`h-12 text-center w-2/3 bg-blue-500 border-2 rounded-md hover:shadow-lg hover:bg-blue-400 text-lg transition`}
              >
                <p className="capitalize text-white font-normal">Search</p>
              </button>
            </div>
          </form>
        </FormProvider>
        {character && (
          <div className="hover:cursor-pointer" onClick={handleSave}>
            <h3>{character.Name}</h3>
            <Image src={character.Avatar} alt={character.Name} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (context: any) => {
  const response = await axios.get(
    `https://xivapi.com/servers?private_key=${process.env.XIVAPI_KEY}`
  );

  const servers = response.data.slice(0, 77);

  const { uid, token } = parseCookies(context);

  return {
    props: {
      servers,
      uid,
      token,
    },
  };
};
