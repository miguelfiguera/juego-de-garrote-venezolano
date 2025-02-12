import React from "react";

function About() {
  const image1 = "https://placehold.co/400"; // Replace with your image path
  const text1 =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const title1 = "Our Vision";

  const image2 = "https://placehold.co/400"; // Replace with your image path
  const text2 =
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const title2 = "Our Mission";

  const image3 = "https://placehold.co/400"; // Replace with your image path
  const text3 =
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  const title3 = "Our Values";

  return (
    <div className="container mt-5">
      <h2>About Us</h2>

      {/* Section 1: Image on the Right */}
      <div
        className="row align-items-center mb-4 mx-auto"
        style={{ maxWidth: "80%" }}
      >
        <div className="col-md-6 order-md-1 text-center text-md-start">
          {" "}
          {/* Changed order and alignment */}
          <h3>{title1}</h3>
          <p>{text1}</p>
        </div>
        <div className="col-md-6 order-md-0 d-flex justify-content-end">
          {" "}
          {/* Changed order and alignment */}
          <img
            src={image1}
            alt="About Us 1"
            className="img-fluid rounded"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>

      {/* Section 2: Image on the Left */}
      <div
        className="row align-items-center mb-4 mx-auto"
        style={{ maxWidth: "80%" }}
      >
        {" "}
        <div className="col-md-6 order-2 order-md-2 d-flex justify-content-start">
          {" "}
          {/* Changed order and alignment */}
          <img
            src={image2}
            alt="About Us 2"
            className="img-fluid rounded"
            style={{ maxWidth: "80%" }}
          />
        </div>
        <div className="col-md-6 order-1 order-md-1 text-center text-md-end">
          {" "}
          {/* Changed order and alignment */}
          <h3>{title2}</h3>
          <p>{text2}</p>
        </div>
      </div>

      {/* Section 3: Image on the Right */}
      <div
        className="row align-items-center mb-4 mx-auto"
        style={{ maxWidth: "80%" }}
      >
        {" "}
        <div className="col-md-6 order-md-1 text-center text-md-start">
          {" "}
          {/* Changed order and alignment */}
          <h3>{title3}</h3>
          <p>{text3}</p>
        </div>
        <div className="col-md-6 order-md-0 d-flex justify-content-end">
          {" "}
          {/* Changed order and alignment */}
          <img
            src={image3}
            alt="About Us 3"
            className="img-fluid rounded"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
