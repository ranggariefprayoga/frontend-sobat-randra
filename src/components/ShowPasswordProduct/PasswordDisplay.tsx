import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordDisplay({ password }: { password: string | undefined }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-sm flex items-center gap-2">
      🔐 Password:
      <span className="font-mono">{showPassword ? password : "••••••••"}</span>
      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-muted-foreground hover:text-primary transition">
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
