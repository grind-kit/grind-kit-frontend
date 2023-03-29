import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

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
  token: string | null;
  uid: string | null;
};

export default function SettingsPage({
  servers,
  token,
  uid,
}: TSettingsPageProps) {
  const [name, setName] = useState<string>("");
  const [selectedServer, setSelectedServer] = useState<string>("");
  const [character, setCharacter] = useState<TCharacter | null>(null);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedServer(value);
  };

  const handleSearch = async () => {
    const response = await axios.get(
      `https://xivapi.com/character/search?name=${name}&server=${selectedServer}&private_key=${process.env.XIVAPI_KEY}`
    );
    setCharacter(response.data.Results[0]);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.BACKEND_URL}/users/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            lodestone_id: character?.ID,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <h2>Settings</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input
          inputMode="text"
          id="name"
          name="name"
          value={name}
          onChange={handleName}
        />
        <label htmlFor="server">Server</label>
        <select
          id="server"
          name="server"
          value={selectedServer}
          onChange={handleServer}
        >
          {servers.map((server: string) => (
            <option key={server} value={server}>
              {server}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {character && (
        <div onClick={handleSave}>
          <h3>{character.Name}</h3>
          <img src={character.Avatar} alt={character.Name} />
        </div>
      )}
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
