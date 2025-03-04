// Page.tsx
"use client";
import React, { useState } from "react";
import { searchUserByEmail } from "@/lib/firebase/admin/auth";
import { show } from "@/lib/firebase/collections/profiles";
import { Profile } from "@/lib/interfaces/interfaces";
import ProfileForAdmin from "@/components/profile/ProfileForAdmin";

const Page = () => {
  const [email, setEmail] = useState("");
  const [myUser, setMyUser] = useState<Profile | null>(null);

  const handleSearch = async () => {
    const user = await searchUserByEmail(email.trim());
    if (user) {
      const result = await show(user);
      if (!result) return;
      setMyUser(result);
    }
  };

  return (
    <div className="container my-4">
      <h4 className="text-center border-bottom">Busqueda por email</h4>
      {!myUser && (
        <div className="container" style={{ maxWidth: "50%" }}>
          <label className="form-label">Email</label>
          <input
            type="text"
            placeholder="email@example.com"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary my-2" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      )}

      {myUser && (
        <div className="container d-flex justify-content-center">
          <ProfileForAdmin profile={myUser} />
        </div>
      )}
    </div>
  );
};

export default Page;
