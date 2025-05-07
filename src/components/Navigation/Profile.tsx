"use client";

import { UserDetailInterface } from "@/model/user.model";
import NoAuthNavbarComponent from "./NoAuthNavbar";
import ProfileComponent from "./ProfileComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export default function Profile({ userDetail, isLoading }: { userDetail: UserDetailInterface; isLoading: boolean }) {
  if (isLoading) {
    return <LoadingComponent />;
  }
  return userDetail ? (
    <ProfileComponent userDetail={userDetail} />
  ) : (
    <div className="flex gap-2">
      <NoAuthNavbarComponent />
    </div>
  );
}
