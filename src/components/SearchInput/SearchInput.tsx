import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="relative max-w-md w-full">
      <Input type="text" placeholder="Cari email user..." value={value} onChange={onChange} autoComplete="off" className="pl-14" />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
  );
}
