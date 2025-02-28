import React from "react";
import { show } from "@/lib/firebase/collections/profiles";
import ProfileDisplay from "@/components/profile/ProfileDisplay";

async function Page({ params }: { params: { id: string } }) {
  const profile = await show(params.id);

  return (
    <div className="container">
      <ProfileDisplay profile={profile} />
    </div>
  );
}

export default Page;
