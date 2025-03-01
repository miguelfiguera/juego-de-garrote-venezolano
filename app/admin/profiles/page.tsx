import React from "react";
import { index } from "@/lib/firebase/collections/profiles";
import ProfileForAdmin from "@/components/profile/ProfileForAdmin";
import Link from "next/link";

async function Page() {
  const profiles = await index();

  const profileCards = profiles.map((profile) => (
    <ProfileForAdmin key={profile.id} profile={profile} />
  ));
  return (
    <div className="container">
      <h1 className="text-center my-4 mx-4 border-bottom">Usuarios</h1>
      <Link href="/admin/profiles/search" className="text-center fs-6">
        <button className="btn btn-secondary">Buscar usuario por email</button>
      </Link>

      <div className="row">{profileCards}</div>
    </div>
  );
}

export default Page;
