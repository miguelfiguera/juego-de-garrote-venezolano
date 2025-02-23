// pages/terms.tsx
import React from "react";

const page = () => {
  const email = "proyectojuegodegarrote@gmail.com";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Términos y Condiciones de Uso</h1>
          <p>
            Bienvenido a juegodegarrotevenezolano.com. Al acceder y utilizar
            este sitio web, usted acepta cumplir con los siguientes términos y
            condiciones de uso. Si no está de acuerdo con estos términos, por
            favor no utilice este sitio.
          </p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            El uso de juegodegarrotevenezolano.com está sujeto a la aceptación y
            cumplimiento de estos términos y condiciones. Nos reservamos el
            derecho de modificar estos términos en cualquier momento, y es su
            responsabilidad revisarlos periódicamente. El uso continuado del
            sitio después de la publicación de cambios constituye su aceptación
            de dichos cambios.
          </p>

          <h2>2. Uso del Sitio Web</h2>
          <p>
            Este sitio web está destinado a proporcionar información sobre el
            juego de garrote venezolano, su historia, técnicas y valores
            culturales. Usted se compromete a utilizar el sitio únicamente para
            fines lícitos y de manera que no infrinja los derechos de otros, ni
            restrinja o inhiba su uso y disfrute.
          </p>
          <p>Queda prohibido el uso del sitio para:</p>
          <ul>
            <li>
              Publicar o transmitir material ilegal, amenazante, abusivo,
              difamatorio, obsceno, vulgar, pornográfico, profano o indecente.
            </li>
            <li>
              Realizar actividades que puedan dañar, sobrecargar o deteriorar el
              funcionamiento del sitio.
            </li>
            <li>
              Intentar acceder a áreas restringidas del sitio sin autorización.
            </li>
            <li>
              Recopilar información de otros usuarios sin su consentimiento.
            </li>
          </ul>

          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todos los contenidos de este sitio web, incluyendo textos, imágenes,
            logotipos, gráficos, videos y otros materiales, están protegidos por
            derechos de autor y otras leyes de propiedad intelectual. Usted no
            está autorizado a reproducir, distribuir, modificar, exhibir,
            transmitir, publicar, vender, licenciar ni crear obras derivadas de
            ningún contenido de este sitio sin nuestro consentimiento previo por
            escrito.
          </p>

          <h2>4. Enlaces a Sitios de Terceros</h2>
          <p>
            Este sitio web puede contener enlaces a sitios web de terceros.
            Estos enlaces se proporcionan únicamente para su conveniencia, y no
            implican que respaldemos o aprobemos el contenido de dichos sitios.
            No somos responsables del contenido, la exactitud o las prácticas de
            privacidad de los sitios web de terceros. El acceso a estos sitios
            es bajo su propio riesgo.
          </p>

          <h2>5. Limitación de Responsabilidad</h2>
          <p>
            En ningún caso seremos responsables por daños directos, indirectos,
            incidentales, especiales o consecuentes que resulten del uso o la
            imposibilidad de usar este sitio web, incluyendo, pero no limitado
            a, daños por pérdida de beneficios, datos, uso, buena voluntad u
            otras pérdidas intangibles, incluso si hemos sido advertidos de la
            posibilidad de tales daños.
          </p>

          <h2>6. Exclusión de Garantías</h2>
          <p>
            Este sitio web se proporciona &quot;tal cual&quot; y &quot;según
            disponibilidad&quot;, sin garantías de ningún tipo, ya sean expresas
            o implícitas, incluyendo, pero no limitado a, garantías de
            comerciabilidad, idoneidad para un propósito particular, no
            infracción o curso de desempeño.
          </p>

          <h2>7. Ley Aplicable</h2>
          <p>
            Estos términos y condiciones se regirán e interpretarán de acuerdo
            con las leyes de Venezuela, sin tener en cuenta sus disposiciones
            sobre conflictos de leyes.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Si tiene alguna pregunta o inquietud acerca de estos términos y
            condiciones, puede contactarnos a través de{" "}
            <a href={`mailto:${email}`} target="_blank" className=" mx-2">
              proyectojuegodegarrote@gmail.com
            </a>
            .
          </p>

          <p className="mt-4">Última actualización: 21/02/2025</p>
        </div>
      </div>
    </div>
  );
};

export default page;
