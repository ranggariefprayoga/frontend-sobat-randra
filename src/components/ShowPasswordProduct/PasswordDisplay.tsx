import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export function PasswordDisplay({ password }: { password?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <span className="text-sm inline-flex items-center gap-2">
      🔐 Password:
      <span className="font-mono">{showPassword ? password : "••••••••"}</span>
      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-muted-foreground hover:text-primary transition">
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </span>
  );
}
