import React from "react";
import Image from "next/image";

const Page = () => {
  const title = "El Patio en el Juego de Garrote Venezolano";
  const imageUrl = "/GarrotePhotos/patio.png"; // Replace with your actual image path
  const imageAlt = "Ejemplo de un Patio de Juego de Garrote";
  const definition = `
En juego de garrote venezolano, un "Patio" es mucho más que un simple espacio físico. Es un lugar de encuentro, aprendizaje y transmisión de conocimientos practicos. Se trata de un área donde se practica y se enseña el arte del garrote, preferiblemente de suelo de tierra.

## Características Principales:

**Espacio de Aprendizaje:** El patio es el aula donde los aprendices reciben las enseñanzas de los maestros. Aquí se aprenden las técnicas, los movimientos, las estrategias y los valores del juego de garrote.

**Lugar de Encuentro:** Es un punto de reunión para los jugadores de garrote, donde comparten experiencias, conocimientos y fortalecen los lazos de comunidad.

**Transmisión de Tradición:** En el patio se transmite la historia y la filosofía del juego de garrote, manteniendo viva la tradición de generación en generación.

**Entrenamiento Físico y Mental:** La práctica en el patio exige disciplina física y mental. Los jugadores deben desarrollar fuerza, agilidad, coordinación, concentración y autocontrol.

**Respeto y Disciplina:** El patio es un lugar donde se fomenta el respeto por el juego, por el cuerpo, por la mente y por la disciplina. La disciplina es fundamental para el aprendizaje y la práctica segura.

**Adaptabilidad:** Un patio puede ser un terreno baldío, un jardín, un espacio en una casa, o cualquier lugar que permita la práctica segura del juego de garrote. Lo importante es el espíritu y la dedicación de los jugadores.

El patio es, en esencia, el corazón del Juego de Garrote Venezolano. Es el lugar donde se forjan los jugadores, se preserva la tradición y se mantiene vivo este valioso patrimonio cultural.
`;

  const parseText = (text: string) => {
    const parts = text.split("\n\n");

    return parts.map((part, index) => {
      if (part.startsWith("## ")) {
        return (
          <h2 key={index} className="mt-4">
            {part.substring(3)}
          </h2>
        );
      } else {
        // Split the paragraph into lines
        const lines = part.split("\n");

        // Process each line in the paragraph to handle bold text
        const processedLines = lines.map((line, lineIndex) => {
          if (line.includes("**")) {
            const parts = line.split("**");
            const elements: React.ReactNode[] = [];
            for (let i = 0; i < parts.length; i++) {
              if (i % 2 === 0) {
                // Regular text
                elements.push(parts[i]);
              } else {
                // Bold text
                elements.push(
                  <strong key={`bold-${lineIndex}-${i}`}>{parts[i]}</strong>
                );
              }
            }
            return <React.Fragment key={lineIndex}>{elements}</React.Fragment>;
          } else {
            return line;
          }
        });

        return (
          <p key={index} className="lead">
            {processedLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        );
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/** Title **/}
          <h1 className="mb-3">{title}</h1>

          {/** Image **/}
          <div className="mb-3">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid rounded"
              width={800}
              height={400}
              layout="responsive"
              objectFit="cover"
              quality={75}
            />
          </div>

          {/** Definition **/}
          {parseText(definition)}
        </div>
      </div>
    </div>
  );
};

export default Page;
