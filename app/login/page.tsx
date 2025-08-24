"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { login } from "@/lib/api-login";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Email atau Password salah");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
