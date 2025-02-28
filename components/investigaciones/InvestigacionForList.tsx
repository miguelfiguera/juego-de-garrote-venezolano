// components/InvestigationForList.tsx
// shows a reduced view of the investigation data.

import React from "react";
import { Investigation } from "@/lib/interfaces/interfaces";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";
import Link from "next/link";

interface InvestigationForListProps {
  investigation: Investigation;
}

const InvestigationForList: React.FC<InvestigationForListProps> = async ({
  investigation,
}) => {
  let customClaims = null;
  const userUid = await getUserIdFromCookie();
  if (userUid) {
    customClaims = await getUserCustomClaims(userUid);
  }

  const routing = customClaims?.admin
    ? `/admin/investigaciones/${investigation.id}`
    : `/investigaciones/${investigation.id}`;

  return (
    <div className="container border rounded-3 my-3 py-3">
      <h4>
        {" "}
        <Link href={routing}>
          <strong>Title:</strong> {investigation.title}
        </Link>
      </h4>
      <br />
      <p>
        {" "}
        <strong>Investigator:</strong> {investigation.investigatorName}
        <br />
        <strong>Review:</strong> {investigation.review}
        <br />
        <strong>Status:</strong> {investigation.status}
        <br />
      </p>
    </div>
  );
};

export default InvestigationForList;
