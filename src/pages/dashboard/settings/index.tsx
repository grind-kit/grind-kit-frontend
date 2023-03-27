import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";

export default function SettingsPage() {
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
      </form>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async () => {
    return null;
};
