import React from "react";
import { cookies } from "next/headers";
import LogOutButton from "./LogOutButton";
import Link from "next/link"; // Import Link

function Navbar() {
  const cookieStore = cookies();
  const token = cookieStore.get("session"); // Directly use cookieStore
  const hasValue = token?.value !== undefined && token?.value !== ""; //Check if cookie has value

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
                    Patio
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/fundamentos/tejido">
                    Tejido
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/fundamentos/garrote">
                    Garrote
                  </Link>
                </li>
              </ul>
            </li>
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
