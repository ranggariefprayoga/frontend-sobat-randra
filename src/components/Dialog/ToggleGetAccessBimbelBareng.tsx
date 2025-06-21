"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
import { useUpdateBimbelBarengAccess } from "@/lib/api/productBimbelBarengAccess.api";

interface GetAccessBimbelBarengSwitchProps {
  productBimbelBarengId: number;
  accessId: number;
  initialValue: boolean;
  onUpdated?: () => void;
}

export default function GetAccessBimbelBarengSwitch({ productBimbelBarengId, accessId, initialValue, onUpdated }: GetAccessBimbelBarengSwitchProps) {
  const [checked, setChecked] = useState(initialValue);
  const updateMutation = useUpdateBimbelBarengAccess();

  // Sinkronisasi jika initialValue berubah dari luar
  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  const handleChange = async (newChecked: boolean | "indeterminate") => {
    if (typeof newChecked !== "boolean") return; // Abaikan indeterminate
    setChecked(newChecked);

    try {
      await updateMutation.mutateAsync({
        bimbel_bareng_access_id: accessId,
        product_bimbel_bareng_id: productBimbelBarengId,
        data: { get_access: newChecked },
      });
      toast.success(`Akses berhasil di${newChecked ? "aktifkan" : "nonaktifkan"}`);
      if (onUpdated) onUpdated();
    } catch {
      toast.error("Gagal update status akses");
      setChecked(!newChecked); // rollback UI kalau gagal
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <Switch checked={checked} onCheckedChange={handleChange} disabled={updateMutation.isPending} />
      {checked ? <CheckCircle2 className="text-green-600" size={20} /> : <XCircle className="text-red-600" size={20} />}
    </div>
  );
}
