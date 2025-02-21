import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          J.G.V.
        </a>
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
                  <a className="dropdown-item" href="/fundamentos/historia">
                    Historia{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/fundamentos/glosario">
                    Glosario{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/fundamentos/patio">
                    Patio
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/fundamentos/tejido">
                    Tejido{" "}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/fundamentos/garrote">
                    Garrote{" "}
                  </a>
                </li>
              </ul>
            </li>
            {/*             <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Blog
              </a>
            </li>{" "} */}
            {/*             <li className="nav-item">
              <a className="nav-link" href="#">
                Tienda
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/jugadores">
                Jugadores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/patios">
                Patios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="/login">
                Iniciar Sesion
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
