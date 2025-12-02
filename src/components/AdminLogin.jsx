import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { useAdmin } from "../context/AdminContext";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useAdmin();

  const login = async () => {
    const snap = await getDoc(doc(db, "settings", "auth"));

    if (!snap.exists()) {
      setError("Auth document missing");
      return;
    }

    const correctPassword = snap.data().adminPassword;

    if (password === correctPassword) {
      loginAdmin(); // **updates navbar + hero instantly**
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="p-6  text-(--color-text) rounded max-w-xs mx-auto">
      <h2 className="text-xl mb-3 font-semibold">Admin Login</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-transparent border border-(--color-border) outline-none text-(--color-text)"
        placeholder="Enter Admin Password"
      />

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <button className="w-full mt-3 bg-(--btn-bg) text-(--btn-text) p-2 rounded" onClick={login}>
        Login
      </button>
    </div>
  );
}
