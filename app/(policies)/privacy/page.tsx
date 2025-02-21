// pages/privacy.tsx
import React from "react";

const page = () => {
  const email = "proyectojuegodegarrote@gmail.com";
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Política de Privacidad</h1>
          <p>
            Bienvenido a la política de privacidad de
            juegodegarrotevenezolano.com. Agradecemos su confianza al utilizar
            nuestro sitio. Esta política describe cómo recopilamos, usamos,
            protegemos y compartimos su información personal. Al utilizar
            nuestro sitio, usted acepta las prácticas descritas en esta
            política.
          </p>

          <h2>1. Información que Recopilamos</h2>
          <p>Recopilamos la siguiente información:</p>
          <ul>
            <li>
              <strong>Información de Registro:</strong> Cuando se registra en
              nuestro sitio, recopilamos su dirección de correo electrónico y
              contraseña.
            </li>
            <li>
              <strong>Información de Perfil:</strong> Recopilamos la información
              que usted proporciona en su perfil, como su nombre, apellido,
              dirección, edad, estado, rol, años en el juego, biografía, código
              postal, teléfono, correo electrónico y estilo.
            </li>
            <li>
              <strong>Información del Patio:</strong> Si usted es un maestro,
              recopilamos información sobre su patio de entrenamiento,
              incluyendo su nombre, dirección, código postal, teléfono de
              contacto y correo electrónico de contacto.
            </li>
            {/*             <li>
              <strong>Información de Uso:</strong> Recopilamos información sobre
              cómo utiliza nuestro sitio, incluyendo las páginas que visita, los
              enlaces en los que hace clic y otras acciones que realiza.
            </li> */}
            {/*             <li>
              <strong>Información del Dispositivo:</strong> Podemos recopilar
              información sobre el dispositivo que utiliza para acceder a
              nuestro sitio, incluyendo el tipo de dispositivo, el sistema
              operativo y el identificador único del dispositivo.
            </li> */}
          </ul>

          <h2>2. Uso de la Información</h2>
          <p>Utilizamos su información para los siguientes fines:</p>
          <ul>
            <li>Proporcionar y mejorar nuestro sitio.</li>
            <li>Personalizar su experiencia.</li>
            <li>
              Comunicarnos con usted, incluyendo el envío de notificaciones,
              actualizaciones y promociones.
            </li>
            <li>Realizar investigaciones y análisis.</li>
            <li>
              Investigaciones Relacionadas con el Juego de Garrote Venezolano:
              Debido al interés público y la naturaleza cultural del juego de
              garrote venezolano, entendemos que la información de los perfiles
              de los usuarios y los patios de entrenamiento puede ser relevante
              para investigaciones académicas, históricas, culturales,
              artisticas, de seguridad, entre otros. Por lo tanto, usted acepta
              explícitamente que la información de su perfil (incluyendo nombre,
              apellido, biografía, rol, estilo y otros detalles demográficos) y
              la información de su patio (incluyendo nombre, dirección y datos
              de contacto) podrá ser divulgada y utilizada en tales
              investigaciones sin necesidad de obtener su consentimiento
              específico para cada caso.
            </li>
          </ul>

          <h2>3. Compartir la Información</h2>
          <p>Podemos compartir su información con:</p>
          <ul>
            <li>
              <strong>Investigadores y Académicos:</strong> Su información de
              perfil y patio podrá ser compartida con investigadores y
              académicos que estén realizando estudios sobre el juego de garrote
              venezolano.
            </li>
            <li>
              <strong>Proveedores de Servicios:</strong> Podemos compartir su
              información con proveedores de servicios que nos ayudan a operar
              nuestro sitio, como proveedores de alojamiento web, proveedores de
              servicios de correo electrónico y proveedores de servicios de
              análisis.
            </li>
            <li>
              <strong>Autoridades Legales:</strong> Podemos divulgar su
              información a las autoridades legales si estamos obligados a
              hacerlo por ley o en respuesta a una orden judicial.
            </li>
          </ul>

          <h2>4. Seguridad de la Información</h2>
          <p>
            Tomamos medidas razonables para proteger su información personal
            contra el acceso no autorizado, el uso indebido o la divulgación.
            Sin embargo, ninguna transmisión de datos a través de Internet o
            sistema de almacenamiento electrónico es 100% seguro. Por lo tanto,
            no podemos garantizar la seguridad absoluta de su información.
          </p>

          <h2>5. Sus Derechos</h2>
          <p>Usted tiene los siguientes derechos:</p>
          <ul>
            <li>Acceder a su información personal.</li>
            <li>Corregir su información personal.</li>
            <li>
              Eliminar su información personal (sujeto a ciertas excepciones).
            </li>
            <li>Oponerse al procesamiento de su información personal.</li>
          </ul>
          <p>
            Para ejercer estos derechos, contáctenos a través de [dirección de
            correo electrónico].
          </p>

          <h2>6. Cambios a esta Política de Privacidad</h2>
          <p>
            Podemos actualizar esta política de privacidad de vez en cuando. Le
            notificaremos cualquier cambio importante mediante la publicación de
            la nueva política en nuestro sitio.
          </p>

          <h2>7. Contacto</h2>
          <p>
            Si tiene alguna pregunta o inquietud acerca de esta política de
            privacidad, puede contactarnos a través de{" "}
            <a href={`mailto:${email}`} target="_blank" className=" mx-2">
              proyectojuegodegarrote@gmail.com
            </a>
          </p>

          <p className="mt-4">Última actualización: 21/02/2025</p>
        </div>
      </div>
    </div>
  );
};

export default page;
