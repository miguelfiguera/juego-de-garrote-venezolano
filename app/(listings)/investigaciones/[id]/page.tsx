import React from "react";
import { show } from "@/lib/firebase/collections/investigations";
import { notFound } from "next/navigation";
import InvestigacionFull from "@/components/investigaciones/InvestigacionFull";
async function Page({ params }: any) {
  const investigation = await show(params.id);
  if (!investigation) {
    notFound();
  }

  return (
    <div className="container">
      <InvestigacionFull key={investigation.id} investigation={investigation} />{" "}
    </div>
  );
}

export default Page;
