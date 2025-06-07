"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateName, useUpdatePassword } from "@/lib/api/user.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProfileProps = {
  userDetail: {
    id: number;
    name: string;
    email: string;
    role: string;
    token: string;
    token_expires: string;
    bimbel_bareng_access: string[];
    try_out_access: string[];
  } | null;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Profile({ userDetail }: ProfileProps) {
  const updateNameMutation = useUpdateName(userDetail?.id ?? 0);
  const updatePasswordMutation = useUpdatePassword(userDetail?.id ?? 0);

  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);

  const [newName, setNewName] = useState(userDetail?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  if (!userDetail) return <p className="text-center px-4 md:px-24 py-8">User not logged in.</p>;

  const handleSaveName = async () => {
    setSavingName(true);
    try {
      await updateNameMutation.mutateAsync({ name: newName });
      toast.success("Nama kamu berhasil di update");
      setEditNameOpen(false);
    } catch {
      toast.error("Gagal mengupdate nama");
    } finally {
      setSavingName(false);
    }
  };

  const handleSavePassword = async () => {
    setSavingPassword(true);
    try {
      await updatePasswordMutation.mutateAsync({ password: newPassword });
      toast.success("Password kamu berhasil di update");
      setEditPasswordOpen(false);
      setNewPassword("");
    } catch {
      toast.error("Gagal mengupdate password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="px-4 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mt-8">
      <Card className="flex flex-col justify-center">
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="w-12 h-12 md:w-16 md:h-16 mx-0 mb-0">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userDetail.name)}&background=ad0a1f&color=fff`} alt={userDetail.name} />
            <AvatarFallback>{userDetail.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <CardTitle className="text-2xl font-semibold">{userDetail.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{userDetail.email}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 justify-start">
            {/* Tombol Edit Nama */}
            <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Edit Nama</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Edit Nama</DialogTitle>
                  <DialogDescription>Ubah nama kamu di sini.</DialogDescription>
                </DialogHeader>
                <div>
                  <Input id="edit-name" type="text" placeholder="Masukkan Nama Baru" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
                </div>
                <DialogFooter>
                  <Button disabled={savingName || newName.trim() === ""} onClick={handleSaveName}>
                    {savingName ? "Menyimpan..." : "Simpan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Tombol Edit Password */}
            <Dialog open={editPasswordOpen} onOpenChange={setEditPasswordOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Edit Password</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Edit Password</DialogTitle>
                  <DialogDescription>Ubah password kamu di sini.</DialogDescription>
                </DialogHeader>
                <div>
                  <Input id="edit-password" placeholder="Masukkan Password Baru" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoFocus />
                </div>
                <DialogFooter>
                  <Button disabled={savingPassword || newPassword.trim() === ""} onClick={handleSavePassword}>
                    {savingPassword ? "Menyimpan..." : "Simpan"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <AccessSection title="Jadwal Bimbel Bareng Kamu" items={userDetail.bimbel_bareng_access} />
          <AccessSection title="Try Out Premium Kamu" items={userDetail.try_out_access} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
function AccessSection({ title, items }: { title: string; items: string[] }) {
  const count = items?.length ?? 0;
  const router = useRouter();

  const handleLihatPaket = () => {
    router.push("/mulai-belajar");
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 border-b border-gray-300 pb-2">
        <h3 className="font-semibold text-lg">{title}</h3>

        <Button onClick={handleLihatPaket} size="sm" variant="outline">
          Lihat Paket
        </Button>
      </div>

      {count === 0 ? (
        <p className="text-sm text-muted-foreground italic">Kamu belum memiliki satupun akses</p>
      ) : (
        <ul className="list-disc list-inside max-h-32 overflow-auto text-sm">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
