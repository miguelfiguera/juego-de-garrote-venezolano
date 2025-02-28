import React from "react";
import { show } from "@/lib/firebase/collections/profiles";
import { show as showPatio } from "@/lib/firebase/collections/patios";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import PatioCard from "@/components/patio/PatioCard";
import Badges from "@/components/profile/Bagdes";

async function Page({ params }: { params: { id: string } }) {
  const profile = await show(params.id);
  let patio = null;
  if (profile && profile.patioId) {
    patio = await showPatio(profile.patioId);
  }

  return (
    <div className="container">
      <ProfileDisplay profile={profile} />
      {patio && (
        <div className="container border-top my-5">
          {" "}
          <h2 className="mt-4">Patio</h2>
          <PatioCard patio={patio} />
        </div>
      )}{" "}
      <div className="container">
        <Badges id={params.id} />
      </div>
    </div>
  );
}

export default Page;
