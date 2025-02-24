"use client";
import React from "react";
import { modifyCustomClaims } from "@/lib/firebase/admin/auth";
import useSessionStore from "@/lib/zustand/userDataState";
import { toast } from "react-toastify";

function ButtonAlmighty() {
  const { userUid } = useSessionStore();
  const handleClick = async () => {
    const claims = {
      admin: true,
      master: true,
      blogger: true,
      seller: true,
      investigator: true,
      jugador: true,
    };
    if (!userUid) {
      return;
    }
    const result = await modifyCustomClaims(userUid, claims);
    if (!result) {
      toast.error("Error updating custom claims");
    }
    toast.success("ALLMIGHTY BUTTON FOR EVER, please log out and log in again");
  };
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      ALLMIGHTY BUTTON FOR EVER
    </button>
  );
}

export default ButtonAlmighty;
