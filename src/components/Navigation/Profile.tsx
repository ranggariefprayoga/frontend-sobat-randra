import { userDetailInterface } from "@/model/user.model";
import NoAuthNavbarComponent from "./NoAuthNavbar";
import ProfileComponent from "./ProfileComponent";

export default async function Profile({ userDetail }: { userDetail: userDetailInterface | null }) {
  return userDetail ? (
    <ProfileComponent userDetail={userDetail} />
  ) : (
    <div className="flex gap-2">
      <NoAuthNavbarComponent />
    </div>
  );
}
