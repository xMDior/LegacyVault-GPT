// src/components/Login.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else {
      alert("Check your email for confirmation!");
      navigate("/auth");
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded flex-1"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Auth;
