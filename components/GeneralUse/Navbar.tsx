"use client";

import React, { useEffect } from "react";
import LogOutButton from "./LogOutButton";
import Link from "next/link"; // Import
import useSessionStore from "@/lib/zustand/userDataState";
import useCustomClaimStore from "@/lib/zustand/customClaimStore";
import {
  getUserCustomClaims,
  getUserIdFromCookie,
} from "@/lib/firebase/admin/auth";

function Navbar() {
  const { session, setSession, setUserUid } = useSessionStore();
  const { customClaims, setCustomClaims } = useCustomClaimStore();

  //in zustand, a refresh may erase the state, so this is a fix from clientside
  // we are using navbar as navbar is always visible.
  useEffect(() => {
    async function setZustandStates() {
      const result1 = await getUserIdFromCookie();
      if (!result1) return;
      setUserUid(result1);
      setSession(true);

      const result2 = await getUserCustomClaims(result1);
      if (result2) {
        setCustomClaims(result2);
      }
    }

    setZustandStates();
  }, []);

  const hasValue = session;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          J.G.V.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sobre el Juego
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/fundamentos/historia">
                    Historia
                  </Link>
                </li>
                {/*                 <li>
                  <Link className="dropdown-item" href="/fundamentos/glosario">
                    Glosario
                  </Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" href="/fundamentos/patio">
                    Que es un patio?
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/investigaciones">
                    Lista de Investigaciones
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/publicaciones">
                    Publicaciones
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" href="/blog">
                    Blog
                  </Link>
                </li>
                                 <li>
                  <Link className="dropdown-item" href="/fundamentos/tejido">
                    Tejido del garrote
                  </Link>
                </li> */}
              </ul>
            </li>
            {hasValue && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuario
                </a>
                <ul className="dropdown-menu">
                  {/*                 <li>
                  <Link className="dropdown-item" href="/productos">
                    Productos
                  </Link>
                </li> */}
                  <li>
                    <Link className="dropdown-item" href="/patios">
                      Mi Patio
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/profile">
                      Perfil
                    </Link>
                  </li>
                  {customClaims?.admin == true && (
                    <li>
                      <Link className="dropdown-item" href="/admin/blog">
                        Admin
                      </Link>
                    </li>
                  )}
                  {hasValue && (
                    <li>
                      <Link className="dropdown-item" href="/">
                        <LogOutButton />
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" href="/jugadores">
                Jugadores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/patios">
                Patios
              </Link>
            </li>

            <li className="nav-item">
              {!hasValue && (
                <Link className="nav-link" href="/login">
                  Iniciar Sesion
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
