import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState, useEffect, FormEventHandler } from "react";
import axios from "axios";

export default function SettingsPage({ servers }: { servers: string[] }) {
  const [name, setName] = useState<string>("");
  const [selectedServer, setSelectedServer] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    console.log(name);
  };

  const handleServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedServer(value);
    console.log(selectedServer);
  };

  const handleSearch = () => {
    console.log(name, selectedServer);
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
    </ProtectedRoute>
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get(
    `https://xivapi.com/servers?private_key=${process.env.XIVAPI_KEY}`
  );

  const slicedArrayOfServers = response.data.slice(0, 77);

  return {
    props: {
      servers: slicedArrayOfServers,
    },
  };
};
