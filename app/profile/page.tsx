import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";
import ProfileDisplay from "@/components/profile/ProfileDisplay";

async function Page() {
  const userUid = await getUserIdFromCookie();
  if (!userUid) {
    console.error("User UID not found");
    return null;
  }
  const profile = await show(userUid);

  return (
    <div className="container">
      {profile ? <ProfileDisplay profile={profile} /> : <ProfileForm />}
    </div>
  );
}

export default Page;
