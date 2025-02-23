import React from "react";
import Image from "next/image";

export interface Profile {
  id: string;
  name?: string;
  lastname?: string;
  address?: string;
  age?: number;
  status?: string;
  role?: string;
  yearsInTheGame?: number;
  biography?: string;
  zipcode?: string;
  phone?: string;
  email?: string;
  style?: string;
  photoUrl?: string;
  country?: string;
  key: string; // To allow potential other properties
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div
      className="card h-100 d-flex flex-row mb-3 rounded-3 mx-auto"
      style={{ width: "75%" }}
    >
      {profile.photoUrl ? (
        <Image
          src={profile.photoUrl}
          className="card-img-left img-fluid rounded-5"
          alt="Foto de Perfil"
          style={{ objectFit: "cover", width: "100px", height: "100px" }}
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
        <h5 className="card-title">
          {profile.name} {profile.lastname}
        </h5>
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
      </div>
    </div>
  );
};

export default ProfileCard;
