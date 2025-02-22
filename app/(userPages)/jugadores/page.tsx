import React from "react";
import { index } from "@/lib/firebase/collections/profiles";
import ProfileCard from "@/components/profile/ProfileCard";

async function Page() {
  const profiles = await index();

  const profileCards = profiles.map((profile) => (
    <ProfileCard key={profile.id} profile={profile} />
  ));

  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Jugadores</h1>
      <div className="row">{profileCards}</div>
    </div>
  );
}

export default Page;
