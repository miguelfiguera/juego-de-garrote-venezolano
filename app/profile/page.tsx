import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";
import { show as showPatio } from "@/lib/firebase/collections/patios";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import PatioCard from "@/components/patio/PatioCard";
import Link from "next/link";
import Badges from "@/components/profile/Bagdes";

async function Page() {
  const userUid = await getUserIdFromCookie();
  let userClaims = null;
  let patio = null;

  // Check if user UID was found
  if (!userUid) {
    console.error("User UID not found");
    return null;
  }
  // Get user custom claims and asigns them to this variable
  userClaims = await getUserCustomClaims(userUid);
  // looks for profile and then for the patio
  const profile = await show(userUid);
  if (profile) {
    if (profile.patioId) {
      patio = await showPatio(profile.patioId);
    }
  }

  console.log(patio);

  return (
    <div className="container">
      {profile ? <ProfileDisplay profile={profile} /> : <ProfileForm />}
      {/*       
      Checks that patio exists, and if it does not,
      returns the option to create one,
      only if customClaims master==true

 */}{" "}
      {patio && (
        <div className="container border-top my-5">
          {" "}
          <h2 className="mt-4">Patio</h2>
          <PatioCard patio={patio} />
        </div>
      )}
      {!patio && profile && userClaims?.master && (
        <div className="container border-top my-3">
          <h3 className="mt-4">Mi Patio</h3>
          <p>No hay patio</p>
          <Link href="/patios/create">
            <button className="btn btn-primary">Crear Patio</button>
          </Link>
        </div>
      )}
      <div className="container">
        <Badges />
      </div>
    </div>
  );
}

export default Page;
