import React from "react";
import Image from "next/image";

function About() {
  const image1 = "/GarrotePhotos/photo1.jpeg"; // Replace with your image path
  const text1 =
    "El juego de garrote es un arte de combate que surge en Venezuela como una forma de lucha cuerpo a cuerpo parte de un sistema de armas que incluía machetes, cuchillos y lanzas. \n Se trata de una disciplina de combate completa que articula varios métodos: combate con garrotes, machetes y cuchillos, desarme, huida; técnicas: pisadas cuadradas y tijeras; palos de ataque al cuerpo: a la cabeza, articulaciones, cuello, además de rebatidas, salidas o quites.";
  const title1 = "Arte y método de defensa personal.";

  const image2 = "/GarrotePhotos/photo2.jpeg"; // Replace with your image path
  const text2 =
    "El juego es un arte bélico de peligrosidad y belleza a la vez. Una forma de esgrima con palo que, cuando está impregnada de su esencia, se torna bella, emocionante y atractiva ante la mirada de los curiosos. Además, en amplio espectro, como expresión artística de nuestro pueblo, podemos decir que es un método de combate autóctono destilado de la necesidad histórica de preservación y/o sobrevivencia del sujeto. ";
  const title2 = "Peligrosidad y Belleza";

  const image3 = "/GarrotePhotos/photo4.jpeg"; // Replace with your image path
  const text3 =
    "Por ser un arte de defensa personal autóctono, su enseñanza conserva como objetivo, aún hoy día, formar combatientes o practicantes, es decir, jugadores hábiles y precisos capaces de derribar, subsumir e incapacitar, siendo considerado un jugador defenso aquel que logre dominar sus principios a cabalidad. Como cualquier otro arte, el juego de garrote venezolano persigue la belleza y la armonía en sus movimientos y aplica conocimientos sistemáticos en cuanto a la anatomía y fisiología de los cuerpos que combaten, así como de la física, para buscar la eficacia. Se puede considerar como un sistema de defensa personal de más de 300 años de antigüedad.";
  const title3 = "Jugadores Defensos";

  return (
    <div className="container mt-5 pb-5">
      <h2 className=" display-3 text-center">El Juego</h2>

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
          <Image
            src={image1}
            width={1080}
            height={810}
            alt="About Us 1"
            className="img-fluid rounded"
            style={{ maxWidth: "80%", minHeight: "400px", minWidth: "600px" }}
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
          <Image
            src={image2}
            width={1080}
            height={810}
            alt="About Us 2"
            className="img-fluid rounded"
            style={{ maxWidth: "80%", minHeight: "400px", minWidth: "600px" }}
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
          <Image
            src={image3}
            width={1080}
            height={810}
            alt="About Us 3"
            className="img-fluid rounded"
            style={{ maxWidth: "80%", minHeight: "400px", minWidth: "600px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
