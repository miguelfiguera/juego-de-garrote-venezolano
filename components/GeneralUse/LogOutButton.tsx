"use client";
import React from "react";
import { logoutUser } from "@/lib/firebase/admin/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LogOutButton() {
  const router = useRouter();
  const handleLogOut = async () => {
    await logoutUser();
    toast.success("Sesion cerrada");
    router.push("/");
  };
  return (
    <button className="nav-link" onClick={handleLogOut}>
      Cerrar Sesion
    </button>
  );
}

export default LogOutButton;
