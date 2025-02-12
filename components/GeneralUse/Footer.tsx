import React from "react";

function Footer() {
  const email = "proyectojuegodegarrote@gmail.com";
  const insta = "https://www.instagram.com/patioambrosioaguilar/";
  const youtube = "https://www.youtube.com/@patiodegarroteambrosioagui2898";
  const whatsapp =
    "https://wa.me/584126119898?text=Quiero%20visitar%20el%20patio";
  return (
    <footer
      className="bg-dark text-light py-3"
      style={{ borderTop: "1px solid #6c757d" }}
    >
      <div className="container">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <p className="mb-0 fw-bold">Patio Ambrosio Aguilar</p>
          <p className="mb-0">
            © {new Date().getFullYear()} Patio Ambrosio Aguilar. All rights
            reserved.
          </p>
          <div className="d-flex justify-content-end">
            <a href={insta} target="_blank" className="text-light mx-2">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            {/*             <a href="#" className="text-light mx-2">
              <i className="fab fa-x-twitter fa-lg"></i>
            </a> */}
            <a href={youtube} target="_blank" className="text-light mx-2">
              <i className="fab fa-youtube fa-lg"></i>
            </a>
            <a href={whatsapp} target="_blank" className="text-light mx-2">
              <i className="fab fa-whatsapp fa-lg"></i>
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="text-light mx-2"
            >
              <i className="fas fa-envelope fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
