import React from "react";
import CreatePatioForm from "@/components/patio/CreatePatioForm";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";

async function Page() {
  let userId = null;
  let name = null;
  let profile;
  const result = await getUserIdFromCookie();
  if (result) {
    userId = result;
  }

  if (userId) {
    profile = await show(userId);
    if (profile) {
      name = profile.name + " " + profile.lastname;
    }
  }

  return (
    <div className="container">
      <h1 className="text-center fw-bold mt-5 mb-3 pt-5 pb-3">Crear Patio</h1>
      <div className="row">
        {userId && name && (
          <CreatePatioForm masterId={userId} masterName={name} />
        )}
      </div>
    </div>
  );
}

export default Page;
