/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!name || !email || !password) {
        toast.error("Semua data wajib diisi.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("Terjadi kesalahan saat registrasi.");
      setName("");
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#690000] via-[#ad0a1f] to-[#ad0a1f] px-4">
      <form onSubmit={handleRegister} className="bg-[#f5f5f5] backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-md px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-black mb-2">Daftar Akun Baru</h1>
        <p className="text-sm text-gray-500 text-center mb-6">SOBAT RANDRA</p>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-black">Nama</label>
          <input
            type="text"
            placeholder="Nama lengkap"
            className="w-full px-4 py-2 border border-[#ad0a1f] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ad0a1f] disabled:opacity-60"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm text-black">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-2 border border-[#ad0a1f] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ad0a1f] disabled:opacity-60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm text-black">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              className="w-full px-4 py-2 pr-10 border border-[#ad0a1f] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ad0a1f] disabled:opacity-60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" tabIndex={-1}>
              {showPassword ? <EyeOff size={20} className="text-[#ad0a1f]" /> : <Eye size={20} className="text-[#ad0a1f]" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="bg-[#ad0a1f] w-full text-white font-semibold py-2 rounded-lg hover:bg-[#d7263d] disabled:opacity-60">
          {isLoading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Daftar"}
        </button>

        <p className="text-sm text-center mt-6 text-[#ad0a1f]">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="font-semibold hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
