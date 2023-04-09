import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { User } from "@/pages/api/api-client";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { TCharacter } from "types/global";
import ChangesSavedPopup from "@/components/Popup";

type TSettingsPageProps = {
  servers: string[];
  token: string | undefined;
  uid: string;
  setIsVisible: Function;
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
  const [saved, setSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = useCallback(async () => {
    await User.putUserInfo(uid, token, character?.ID);
    setSaved(true);
    setCharacter(null);
  }, [character, token, uid]);

  useEffect(() => {
    if (saved) {
      setIsVisible(true);
    }
  }, [saved]);

  const onSubmit = async ({ characterName, server }: SearchType) => {
    const response = await axios.get(
      `https://xivapi.com/character/search?name=${characterName}&server=${server}&private_key=${process.env.XIVAPI_KEY}`
    );
    setCharacter(response.data.Results[0]);
  };

  return (
    <ProtectedRoute>
      <div className="settings-form container mx-auto w-80 my-12 border-2 rounded-md border-gray-200">
        <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-500">
          Character Settings
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-72 mx-auto pb-12 px-4"
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
                aria-label="Search"
                type="submit"
                className={`h-12 text-center w-2/3 bg-blue-500 border-2 rounded-md hover:shadow-lg hover:bg-blue-400 text-lg transition`}
              >
                <p className="capitalize text-white font-normal">Search</p>
              </button>
            </div>
          </form>
        </FormProvider>
        <ChangesSavedPopup isVisible={isVisible} setIsVisible={setIsVisible} />
        {character && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative max-w-screen-md mx-auto w-1/3 p-6 bg-white rounded-md flex gap-3 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between">
              <div className="w-full">
                <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-500">
                  Confirm Character
                </h2>
                <div className="flex flex-row mt-8 items-center justify-center">
                  <Image
                    src={character.Avatar}
                    alt="Character Avatar"
                    width={75}
                    height={75}
                    className="rounded-full"
                  />
                  <h3 className="text-xl ml-4 font-semibold text-slate-900">
                    {character.Name} - {character.Server}
                  </h3>
                </div>
                <div className="flex flex-row mt-8 items-center justify-center">
                  <button
                    aria-label="Back"
                    type="submit"
                    onClick={() => setCharacter(null)}
                    className={`h-12 text-center w-2/3 bg-gray-500 border-2 rounded-md hover:shadow-lg hover:bg-gray-400 text-lg transition`}
                  >
                    <p className="capitalize text-white font-normal">Back</p>
                  </button>
                  <button
                    aria-label="Confirm"
                    type="submit"
                    onClick={handleSave}
                    className={`h-12 text-center w-2/3 ml-4 bg-blue-500 border-2 rounded-md hover:shadow-lg hover:bg-blue-400 text-lg transition`}
                  >
                    <p className="capitalize text-white font-normal">Confirm</p>
                  </button>
                </div>
              </div>
            </div>
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
  const { setIsVisible } = context.query;

  return {
    props: {
      servers,
      uid,
      token,
      setIsVisible,
    },
  };
};
