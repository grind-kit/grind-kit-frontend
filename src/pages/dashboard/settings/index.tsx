import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";
import axios from "axios";

export default function SettingsPage({ servers }: { servers: string[] }) {
  const [characterName, setCharacterName] = useState<string>("");
  const [server, setServer] = useState<string>("");

  const handleSubmit = () => {};

  return (
    <ProtectedRoute>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          inputMode="text"
          id="name"
          name="name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <label htmlFor="server">Server</label>
        <select id="server" name="server">
          {servers.map((server: string) => (
            <option key={server} value={server}>
              {server}
            </option>
          ))}
        </select>
      </form>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get(
    `https://xivapi.com/servers?private_key=${process.env.XIVAPI_KEY}`
  );

  return {
    props: {
      servers: response.data,
    },
  };
};
