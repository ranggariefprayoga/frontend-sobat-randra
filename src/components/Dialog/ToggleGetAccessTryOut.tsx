"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useUpdateTryOutAccess } from "@/lib/api/tryOutAccess.api";
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

interface GetAccessSwitchProps {
  productTryOutId: number;
  accessId: number;
  initialValue: boolean;
  onUpdated?: () => void;
}

export default function GetAccessSwitch({ productTryOutId, accessId, initialValue, onUpdated }: GetAccessSwitchProps) {
  const [checked, setChecked] = useState(initialValue);
  const updateMutation = useUpdateTryOutAccess();

  // Sinkronisasi jika initialValue berubah dari luar
  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  const handleChange = async (newChecked: boolean | "indeterminate") => {
    if (typeof newChecked !== "boolean") return; // Abaikan indeterminate
    setChecked(newChecked);

    try {
      await updateMutation.mutateAsync({
        id: accessId,
        product_try_out_id: productTryOutId,
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
