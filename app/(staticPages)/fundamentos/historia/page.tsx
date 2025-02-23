import React from "react";
import Image from "next/image";

const page = () => {
  const title =
    "El juego de garrote venezolano: arte y método de defensa personal.";
  const imageUrl = "https://placehold.co/800x600.jpg"; // Replace with your actual image path
  const imageAlt = "Practicantes del juego de garrote venezolano";
  const text = `
El juego de garrote es un arte de combate que surge en Venezuela durante el siglo XIX (aunque es de data mayor) como una forma de lucha cuerpo a cuerpo parte de un sistema de armas que incluía machetes, cuchillos y lanzas. Suponemos que tiene su origen en el entorno y momento histórico de la colonia y alcanza su auge al fragor de las luchas independentistas y las guerras de clase durante el siglo XIX. Es así que adopta parte de las creencias y códigos de honor propios de la cultura y la sociedad, en el tiempo en que se desarrolla. Se trata de una disciplina de combate completa que articula varios métodos: combate con garrotes y cuchillos, desarme, huida; técnicas: pisadas cuadradas y tijeras; palos de ataque al cuerpo: a la cabeza, articulaciones, cuello, además de rebatidas, salidas o quites; y líneas de aprendizaje para la iniciación en el juego. Consta de una pedagogía propia que contempla, además, valores como: dedicación, constancia, autocontrol, entre muchos otros, que se han transmitido oralmente a través de las enseñanzas de los maestros generación tras generación.

La categoría más acorde para definir al juego de garrote venezolano podría ser la de método de “defensa personal”, porque, en jerga del propio juego, el término “defenso” refiere a una persona que es ducho en el arte de defenderse hábilmente con los recursos propios del juego. Maestros como Mercedes Pérez Amaro solían usar este término para afirmar quién era jugador o jugadora de garrote; igualmente, y esto a modo de dato histórico, se comenta del General Ezequiel Zamora, “dicho por el pueblo, era relancino y defenso”. El juego es un arte bélico de peligrosidad y belleza a la vez. Una forma de esgrima con palo que, cuando está impregnada de su esencia, se torna bella, emocionante y atractiva ante la mirada de los curiosos. Además, en amplio espectro, como expresión artística de nuestro pueblo, podemos decir que es un método de combate autóctono destilado de la necesidad histórica de preservación y/o sobrevivencia del sujeto. 

Por ser un arte de defensa personal autóctono, su enseñanza conserva como objetivo, aún hoy día, formar combatientes o practicantes, es decir, jugadores hábiles y precisos capaces de derribar, subsumir e incapacitar, siendo considerado un jugador defenso aquel que logre dominar sus principios a cabalidad. Como cualquier otro arte, el juego de garrote venezolanpersigue la belleza y la armonía en sus movimientos y aplica conocimientos sistemáticos en cuanto a la anatomía y fisiología de los cuerpos que combaten, así como de la física, para buscar la eficacia. Se puede considerar como un sistema de defensa personal de más de 300 años de antigüedad, que fue históricamente practicado por poblaciones que vivían en el contexto de la guerra, pero no estaban involucradas directamente en la batalla. Al igual que ha sucedido en muchas otras culturas, que han generado métodos propios de combate, es con el juego de garrote que nosotros los venezolanos hemos protegidohistóricamente nuestra integridad física, minimizando o eliminando los riesgos de  diferentes situaciones de ataque, que es el objetivo de cualquier método de defensa personal.
`;

  const text2 = `## Valoración del juego de garrote venezolano: valores culturales y su técnica.

El juego de garrote debe ser caracterizado a partir de la historia de la gente pobre y racializada de este país que peleó descalza y hambreada en las guerras de independencia, y también en las guerras “civiles”; que no eran ni más ni menos que enfrentamientos de clase. Gente que generalmente no era considerada ciudadana, y que en etapas posteriores fue incluso criminalizada por la posesión y el uso del garrote, entre otros atrevimientos. 

Sin embargo, a lo largo de la historia el juego de garrote ha sido un método de defensa que estuvo popularizado en distintos sectores de la sociedad y que hoy en día ya no goza de esa popularidad. Que ha sido practicado indistintamente por ricos y pobres, por ladrones y policías, por militares, civiles y hasta curas. El juego tuvo sus prohibiciones en distintas épocas, lo que evidencia lo realmente popular de su práctica y su peligrosidad. 

La primera relación que existe en el juego es de confianza. Primero, del que desea aprender y confía en la persona que desea que le enseñe, y luego de la persona escogida para enseñar que acepta a su discípulo, por observar en él o ella una persona en quien puede confiar. Existe una relación profunda de respeto, de amistad y de valoración al maestro o maestra que enseña; entendiendo que la persona que gane el título de maestro en la comunidad del juego es porque ha demostrado una serie de cualidades técnicas, teóricas y filosóficas que le da ese reconocimiento. Aunque no existe un escalafón explícito como en otras artes, en el juego de garrote existe un reconocimiento tácito de cuándo se es aprendiz, de cuándo se es un jugador o jugadora avanzada, cuándo se es “Defenso” o “Defensa”, y de cuándo se llega a ser maestro o maestra ya sea que el grupo esté compuesto de tan solo dos personas.

Los valores técnicos del juego de garrote están atados a nuestros propios valores culturales, ya que surgen por una realidad histórica, social y geográfica. Quizás, el problema es que aún vemos los valores culturales como formas contemplativas y bellas de nuestro pasado, por demás romantizadas. Pensamos, pues que también es cultural la violencia, las prácticas de duelo en las cárceles, el machismo, el consumo de alcohol, entre otras cosas. Ahora, el Juego de Garrote, surge en una época donde el combate cuerpo a cuerpo, el uso de armas de corte, o armas blancas (sable, machete, cuchillo, puntas de lanzas, garrotes, entre otras) eran de utilidad frecuente en el arte de la guerra; o sea, que su técnica obedece a la cultura de las defensas de un momento histórico particular de Venezuela. De allí que el juego de garrote no reproduce líneas prestablecidas, más bien las incorpora y las moldea según la eficacia o la belleza que busque el cuerpo defenso; incluso produce movimientos rápidos e imprevistos para los contrincantes menos experimentados, y en ocasiones despliega unos deseos prohibidos por las buenas costumbres y la consciencia de la buena moral y la corrección política, que lo transforman en una danza homicida, al decir del escritor venezolano Francisco Herrera Luque. Toda técnica está enmarcada en una cultura implícita en su uso, pero hay culturas que oprimen y otras de la resistencia. 

### Ahora, para hablar de la técnica es importante acotar varias cosas:

1. En las disciplinas que se esgrimen armas blancas, mayormente el arma va adelante del cuerpo según el uso del arma. En el caso Juego, se cambia de mano y puede estar el arma adelante o atrás dependiendo de la necesidad y creatividad del jugador. También, era común el uso de dos armas, machete y garrote, o garrote y cuchillo.
2. En el juego de garrote, la mano desarmada también juega y es una protección.

3. La guardia en el juego de garrote no es abierta, por lo comentado anteriormente, y es importante acotar que en los distintos sistemas de defensa se abre la guardia o se expone al realizar el ataque.

4. Tener una postura de perfil, evita exponer partes nobles del cuerpo, por ello existen líneas de entrada y salida que responden a los cuadros (figuras geométricas que se trazan en la tierra para guiar al aprendiz).

5. Los esquemas del juego, tanto los cuadros, pisadas, formas de pararse, ataques y defensas, obedecen al tipo de arma (garrote, machete, cuchillo) y no 
se limita al uso de las mismas, ya que una persona sin ningún arma puede defenderse o atacar con dichas técnicas. Se juega el cuerpo.`;

  // Function to parse the text and return React elements
  const parseText = (text: string) => {
    const parts = text.split("\n");
    return parts.map((part, index) => {
      if (part.startsWith("## ")) {
        // H2 Title
        return (
          <h2 key={index} className="mt-4">
            {part.substring(3)}
          </h2>
        );
      } else if (part.startsWith("### ")) {
        // H3 Title
        return (
          <h3 key={index} className="mt-4">
            {part.substring(4)}
          </h3>
        );
      } else if (part.startsWith("1) ")) {
        // Ordered List Item
        return <li key={index}>{part.substring(3)}</li>;
      } else {
        // Paragraph
        return (
          <p key={index} className="lead">
            {part}
          </p>
        );
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* Title */}
          <h1 className="mb-3">{title}</h1>

          {/* Image */}
          <div className="mb-3">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid rounded"
              width={800}
              height={400}
              //layout="responsive"
              //objectFit="cover"
              //quality={75}
            />
          </div>

          {/* Parsed Text */}
          {parseText(text)}

          <div className="mb-3">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid rounded"
              width={800}
              height={400}
              //layout="responsive"
              //objectFit="cover"
              //quality={75}
            />
          </div>
          {parseText(text2)}
          <div className="mb-3">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid rounded"
              width={800}
              height={400}
              //layout="responsive"
              //objectFit="cover"
              //quality={75}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
