"use client";

import React from "react";
import { useUser, useGetUserDetail } from "@/lib/api/user.api";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Profile from "./Profile";

export default function ProfileComponentPages() {
  const { data, isLoading } = useUser();
  const userId = data?.data?.id ?? "";
  const { data: detailUser, isLoading: detailLoading } = useGetUserDetail(userId);

  if (isLoading || detailLoading)
    return (
      <div className="px-8 md:px-24 flex justify-center w-full">
        <LoadingComponent color="#ad0a1f" />
      </div>
    );

  return <Profile userDetail={detailUser?.data ?? null} />;
}
