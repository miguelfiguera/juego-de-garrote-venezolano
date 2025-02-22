"use client";
import React from "react";
import { logoutUser } from "@/lib/firebase/admin/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSessionStore from "@/lib/zustand/userDataState";

function LogOutButton() {
  const router = useRouter();
  const { setUserUid, setSession } = useSessionStore();
  const handleLogOut = async () => {
    //logs out user killing the cookie
    await logoutUser();
    // logs out user on the client killing the state
    setUserUid("");
    setSession(false);
    // notifies the user about closed session
    toast.success("Sesion cerrada");
    //redirects to home
    router.push("/");
  };
  return (
    <button className="nav-link" onClick={handleLogOut}>
      Cerrar Sesion
    </button>
  );
}

export default LogOutButton;
