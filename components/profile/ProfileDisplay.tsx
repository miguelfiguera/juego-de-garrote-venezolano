"use client";
import React from "react";
import { destroy } from "@/lib/firebase/collections/profiles";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Profile } from "@/lib/interfaces/interfaces";
import useSessionStore from "@/lib/zustand/userDataState";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";

interface ProfileInfoProps {
  profile: Profile | null;
}

const ProfileDisplay: React.FC<ProfileInfoProps> = ({ profile }) => {
  const router = useRouter();
  let { userUid } = useSessionStore();
  const { customClaims } = useCustomClaimStore();

  if (!profile) {
    return <p>Cargando...</p>;
  }

  const handleEdit = () => {
    router.push(`/profile/edit`);
  };

  const handleDelete = () => {
    destroy(profile.id);
    router.push("/profile");
  };

  const handleDeactivate = () => {
    router.push("/DeleteAccount");
  };

  // Control to render buttons for the crud of the profile.
  const isTrue = userUid === profile.userId;
  const isAdmin = customClaims?.admin;
  const anyOfThis = isAdmin ? isAdmin : isTrue;

  return (
    <div className="container mt-4">
      <h2>Datos del Perfil</h2>
      <div className="row">
        <div className="col-md-4">
          {/* Profile Picture */}
          {profile.photoUrl ? (
            <Image
              src={profile.photoUrl}
              alt="Foto de Perfil"
              className="img-fluid rounded-circle"
              width={350}
              height={350}
              style={{ width: "350px", height: "350px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white"
              style={{ width: "200px", height: "200px" }}
            >
              Sin foto
            </div>
          )}
        </div>

        <div className="col-md-8 border rounded-3 mb-5 p-3">
          {/* Name */}
          {profile.name && profile.lastname && (
            <p>
              <strong>Nombre:</strong> {profile.name} {profile.lastname}
            </p>
          )}

          {/* Age */}
          {profile.age && (
            <p>
              <strong>Edad:</strong> {profile.age}
            </p>
          )}

          {/* Status */}
          {profile.status && (
            <p>
              <strong>Estado:</strong> {profile.status}
            </p>
          )}
          {profile.country && (
            <p>
              <strong>Pais:</strong> {profile.country}
            </p>
          )}

          {/* Rol */}
          {profile.role && (
            <p>
              <strong>Rol:</strong> {profile.role}
            </p>
          )}

          {/* Years in the Game */}
          {profile.yearsInTheGame && (
            <p>
              <strong>Años en el Juego:</strong> {profile.yearsInTheGame}
            </p>
          )}

          {/* Biography */}
          {profile.biography && (
            <p>
              <strong>Biografía:</strong> {profile.biography}
            </p>
          )}

          {/* Zipcode */}
          {profile.zipcode && (
            <p>
              <strong>Código Postal:</strong> {profile.zipcode}
            </p>
          )}

          {/* Phone */}
          {profile.phone && (
            <p>
              <strong>Teléfono:</strong> {profile.phone}
            </p>
          )}

          {/* Email */}
          {profile.email && (
            <p>
              <strong>Correo Electrónico:</strong> {profile.email}
            </p>
          )}

          {/* Style */}
          {profile.style && (
            <p>
              <strong>Estilo:</strong> {profile.style}
            </p>
          )}

          {/* National ID */}
          {profile.nationalIdNumber && profile.userId === userUid && (
            <p>
              <strong>Número de Indentificación Nacional:</strong>{" "}
              {profile.nationalIdNumber}
            </p>
          )}

          {/* User ID */}
          {/*       {profile.userId && (
            <p>
              <strong>ID de Usuario:</strong> {profile.userId}
            </p>
          )} */}

          {/* Master ID */}
          {profile.masterId && (
            <p>
              <strong>ID de Maestro:</strong> {profile.masterId}
            </p>
          )}

          {anyOfThis && (
            <div className="d-flex justify-content-center pb-2 border-top pt-4">
              <button className="btn btn-primary mx-2" onClick={handleEdit}>
                Editar
              </button>
              <button className="btn btn-warning  mx-2" onClick={handleDelete}>
                Borrar Perfil
              </button>
              <button
                className="btn btn-danger  mx-2"
                onClick={handleDeactivate}
              >
                Desactivar Cuenta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
