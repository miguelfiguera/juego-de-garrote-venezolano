import React from "react";
import InvestigationCreateForm from "@/components/investigaciones/InvestigationCreateForm";
import { getUserIdFromCookie } from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";

async function Page() {
  const uid = await getUserIdFromCookie();
  if (!uid) return;
  const profile = await show(uid);
  if (!profile) return;

  return (
    <div className="container">
      <h2 className="text-center my-2 py-2">Registrar investigacion</h2>
      <InvestigationCreateForm
        investigatorId={uid}
        investigatorName={profile.name + " " + profile.lastname}
      />
    </div>
  );
}

export default Page;
