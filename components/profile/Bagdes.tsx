import React from "react";
import Link from "next/link";
import {
  getUserIdFromCookie,
  getUserCustomClaims,
} from "@/lib/firebase/admin/auth";
const Badges = async () => {
  const userId = await getUserIdFromCookie();
  if (!userId) return null;
  const customClaims = await getUserCustomClaims(userId);
  if (!customClaims) return null;
  return (
    <div className="container mt-4 border-top py-3">
      <h2>Permisos del Usuario</h2>
      <ul>
        {Object.entries(customClaims).map(([key, value]) =>
          value === true ? (
            <li key={key}>
              {key}: {value ? "Si" : "No"}
            </li>
          ) : (
            <></>
          )
        )}
      </ul>

      <div className="container">
        <Link href={"/badges"}>
          <button className="btn btn-primary">Editar Permisos</button>
        </Link>
      </div>
    </div>
  );
};

export default Badges;
