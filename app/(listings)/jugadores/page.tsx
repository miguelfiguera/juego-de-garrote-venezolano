import React from "react";
import { index } from "@/lib/firebase/collections/profiles";
import ProfileCard from "@/components/profile/ProfileCard";

async function Page() {
  const profiles = await index();

  const profileCards = profiles.map((profile) => (
    <ProfileCard key={profile.id} profile={profile} />
  ));

  if (profiles.length === 0) {
    return (
      <div className="container">
        <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Jugadores</h1>
        <div className="">
          {" "}
          <h1 className="text-center">
            No hay jugadores registrados por ahora.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3 border-bottom">
        Jugadores
      </h1>
      <div className="row">{profileCards}</div>
    </div>
  );
}

export default Page;
