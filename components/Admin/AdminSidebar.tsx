// components/AdminSidebar.tsx
"use client";

import React from "react";
import LogOutButton from "../GeneralUse/LogOutButton";

const AdminSidebar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/admin">
          J.G.V. Administrador
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          //tabIndex={-1}
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Modulos
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <i className="fa-solid fa-house mx-2 my-1" /> J.G.V.
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/investigaciones">
                  <i className="fa-solid fa-paste mx-2 my-1"></i>{" "}
                  Investigaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/publicaciones">
                  <i className="fa-solid fa-newspaper mx-2 my-1"></i>
                  Publicaciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/patios">
                  <i
                    className="fa-solid fa-square-xmark mx-2 my-1"
                    style={{ rotate: "45deg" }}
                  ></i>
                  Patios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/profiles">
                  <i className="fa-solid fa-users mx-2 my-1"></i>
                  Usuarios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/blog">
                  <i className="fa-solid fa-pencil mx-2 my-1"></i> Blog
                </a>
              </li>
              <li className="nav-item">
                <LogOutButton />
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Tienda
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuarios
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            {/*             <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;
