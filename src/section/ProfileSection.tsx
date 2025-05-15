"use client";

import LayoutBackgroundWhite from "@/layout/LayoutBackgroundWhite";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import ButtonWithIcon from "@/components/TombolBack/TombolBack";
import ProfileComponentPages from "@/pages/Profile/ProfileComponent";
import { ArrowLeft } from "lucide-react";

export default function ProfileSection() {
  return (
    <LayoutBackgroundWhite>
      <ButtonWithIcon icon={ArrowLeft} label="Kembali" />
      <TitleComponent title="Profile Kamu" subTitle="Informasi akun kamu" />
      <ProfileComponentPages />
    </LayoutBackgroundWhite>
  );
}
