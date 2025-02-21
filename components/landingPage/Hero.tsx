import React from "react";

function Hero() {
  const backgroundImage = "/GarrotePhotos/photo3.jpeg";
  const title = "Juego de Garrote Venezolano";
  const text =
    "Conoce el arte marcial de Origen Venezolano de la mano de sus cultores, investigadores y maestros.";
  const buttonText = "Registrarme";
  const buttonLink = "/register";

  return (
    <div
      className="container-fluid bg-dark text-light py-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "",
        backgroundPosition: "center",
        minHeight: "500px", // Adjust as needed
        position: "relative", // Required for the overlay
      }}
    >
      <div
        className="position-absolute top-50 start-50 translate-middle text-center"
        style={{
          zIndex: 1, // Ensure text is above the background image
        }}
      >
        <h1 className="display-4 fw-bold mb-3">{title}</h1>
        <p className="lead mb-4">{text}</p>
        <a href={buttonLink} className="btn btn-primary btn-lg">
          {buttonText}
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
          zIndex: 0, // Ensure the overlay is below the text
        }}
      ></div>
    </div>
  );
}

export default Hero;
