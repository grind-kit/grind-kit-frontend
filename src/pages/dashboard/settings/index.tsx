import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState<string>("");
  const [server, setServer] = useState<string>("");

  return (
    <ProtectedRoute>
      <h2>Settings</h2>
    </ProtectedRoute>
  );
}
