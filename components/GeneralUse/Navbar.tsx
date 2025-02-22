"use client";

import React from "react";
import LogOutButton from "./LogOutButton";
import Link from "next/link"; // Import
import useSessionStore from "@/lib/zustand/userDataState";

function Navbar() {
  const { session } = useSessionStore();
  const hasValue = session;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                Fundamentos
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/fundamentos/historia">
                    Historia
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/fundamentos/glosario">
                    Glosario
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/fundamentos/patio">
                    Que es un patio?
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/fundamentos/tejido">
                    Tejido del garrote
                  </Link>
                </li>
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
                      Patio
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/profile">
                      Perfil
                    </Link>
                  </li>
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
              {hasValue ? (
                <LogOutButton /> // Render LogOutButton if cookie exists
              ) : (
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
