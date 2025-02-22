import React from "react";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";

async function Page() {
  const userUid = await getUserIdFromCookie();
  if (!userUid) {
    console.error("User UID not found");
    return null;
  }
  const profile = await show(userUid);

  return (
    <div className="container">
      {profile ? (
        <EditProfileForm profile={profile} />
      ) : (
        <div>
          <h1 className="text-center fw-bold my-5 py-5">Profile not found</h1>
        </div>
      )}
    </div>
  );
}

export default Page;
