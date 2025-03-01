import React from "react";
import Image from "next/image";
import {
  getUserCustomClaims,
  getUserIdFromCookie,
} from "@/lib/firebase/admin/auth";
import Link from "next/link";
import { Profile } from "@/lib/interfaces/interfaces";
import RemoveFromPatio from "./RemoveFromPatio";

interface PatioProfileCardProps {
  profile: Profile;
  patioId: string;
}

const PatioProfileCard: React.FC<PatioProfileCardProps> = async ({
  profile,
  patioId,
}) => {
  let customClaims = null;
  const userUid = await getUserIdFromCookie();

  if (userUid) {
    customClaims = await getUserCustomClaims(userUid);
  }

  const route = customClaims?.admin
    ? `/admin/profiles/${profile.userId}`
    : `/profile/${profile.userId}`;

  const isMypatio = patioId == profile.patioId;
  const isMaster = profile.masterId == userUid && isMypatio;
  const isAdminOrMaster = customClaims?.admin || isMaster;

  return (
    <div
      className="card h-100 d-flex flex-row mb-3 rounded-3 mx-auto"
      style={{ width: "75%" }}
    >
      {profile.photoUrl ? (
        <Image
          src={profile.photoUrl}
          className="card-img-left img-fluid rounded-5 p-3"
          alt="Foto de Perfil"
          style={{ objectFit: "cover", minWidth: "350px", minHeight: "350px" }}
          width={100}
          height={100}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-secondary text-white rounded-5 my-4"
          style={{ width: "100px", height: "100px" }}
        >
          Sin Foto
        </div>
      )}
      <div className="card-body">
        <Link href={route}>
          {" "}
          <h5 className="card-title fw-bold border-bottom my-2">
            {profile.name} {profile.lastname}
          </h5>
        </Link>
        {profile.country && (
          <p className="card-text">
            <strong>País:</strong> {profile.country}
          </p>
        )}
        {profile.status && (
          <p className="card-text">
            <strong>Estado:</strong> {profile.status}
          </p>
        )}
        {profile.phone && (
          <p className="card-text">
            <strong>Teléfono:</strong> {profile.phone}
          </p>
        )}
        {profile.role && (
          <p className="card-text">
            <strong>Rol:</strong> {profile.role}
          </p>
        )}
        {profile.style && (
          <p className="card-text">
            <strong>Estilo:</strong> {profile.style}
          </p>
        )}

        {isAdminOrMaster && <RemoveFromPatio profileId={profile.id} />}
      </div>
    </div>
  );
};

export default PatioProfileCard;
