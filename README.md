# JuegoDeGarroteVenezolano.com

Este proyecto ha sido construido usando las siguientes librerias:

- **Framework de Frontend:** Next.js 14.2
- **Lenguaje de Programación:** TypeScript
- **Framework de CSS:** Bootstrap
- **Backend:** Firebase Store & Storage
- **Operaciones Administrativas:** Firebase Admin
- **Registro de Dominio:** Namecheap
- **Despliegue:** Netlify
- **Prettier:** Formato del Codigo.
- **React-tostify:** Notificaciones.
- **Next-font:** Fonts

**Descripción:**
Este proyecto utiliza **Next.js 14.2** para construir una aplicación web moderna y eficiente. La aplicación está desarrollada en **TypeScript** para aprovechar sus beneficios de tipado estático y mejor mantenimiento del código, especialmente para reforzar el uso de interfaces a la hora de gestionar la base de datos NOsql de firestore. Utiliza **Bootstrap** para un diseño responsivo y atractivo, facilitando la creación de interfaces de usuario coherentes en diferentes dispositivos.

Los datos se almacenan y gestionan mediante **Firebase Store & Storage**, permitiendo una integración sencilla y segura con la base de datos en la nube. **Firebase Admin** se utiliza para validar sesiones, tareas administrativas y tareas en segundo plano (cloud functions), asegurando una gestión robusta y escalable del sistema.

---

## Documentacion de las librerias:

- **Framework de Frontend:** [Next.js 14.2](https://nextjs.org/blog/next-14-2)
- **Lenguaje de Programación:** [TypeScript](https://www.typescriptlang.org/docs/)
- **Framework de CSS:** [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **Backend:** [Firebase Store & Storage](https://firebase.google.com/docs)
- **Operaciones Administrativas:** [Firebase Admin](https://firebase.google.com/docs/reference/admin)
- **Registro de Dominio:** [Namecheap](https://www.namecheap.com/Support/Knowledgebase/)
- **Despliegue:** [Netlify](https://docs.netlify.com/)
- **Prettier:** [Formateo del Código](https://prettier.io/docs/)
- **React-tostify:** [Notificaciones](https://fkhadra.github.io/react-toastify/introduction/)

---

¡Claro! A continuación, te proporciono una documentación precisa del código que has compartido. Este código es un conjunto de funciones para gestionar usuarios utilizando Firebase Authentication desde el lado del servidor, aprovechando las capacidades del **Firebase Admin SDK** y **Firebase Client SDK**.

---

# Documentación del Módulo de Gestión de Usuarios con Firebase

Este módulo se encarga de gestionar la autenticación y autorización de usuarios en una aplicación utilizando Firebase. Incluye funciones para crear usuarios, obtener todos los usuarios, actualizar usuarios, deshabilitar usuarios, crear administradores, iniciar sesión y verificar la seguridad de las sesiones.

## Importaciones y Configuración Inicial

```javascript
"use server";
import { adminAuth } from "@/lib/firebase/admin/firebaseAdmin";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { cookies } from "next/headers";
```

- **"use server";**: Indica que este código se ejecuta en el lado del servidor.
- **adminAuth**: Objeto de autenticación del servidor proporcionado por Firebase Admin SDK.
- **signInWithEmailAndPassword, signOut**: Funciones del cliente de Firebase para iniciar y cerrar sesión.
- **auth**: Objeto de autenticación del cliente proporcionado por Firebase Client SDK.
- **cookies**: Funciones para manipular las cookies en Next.js.

## Funciones del Módulo

### 1. Crear Usuario (`createUser`)

```javascript
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await adminAuth.createUser({
      email: email,
      password: password,
    });
    console.log("Successfully created new user:", userCredential.uid);

    // Establecer custom claims para el usuario
    adminAuth.setCustomUserClaims(userCredential.uid, {
      admin: false,
      master: false,
      blogger: false,
      seller: false,
    });
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
```

**Descripción:**

- **Propósito:** Crea un nuevo usuario con el correo electrónico y contraseña proporcionados.
- **Proceso:**
  - Utiliza `adminAuth.createUser` para crear el usuario en Firebase.
  - Después de crear el usuario, establece **custom claims** (reclamaciones personalizadas) para asignar roles al usuario. Las propiedades `admin`, `master`, `blogger` y `seller` se establecen como booleanos (`false` por defecto).
- **Retorno:**
  - Si tiene éxito, devuelve el objeto `userCredential` que contiene información del usuario creado.
  - Si falla, devuelve `null` y registra el error en la consola.

### 2. Obtener Todos los Usuarios (`getAllUsers`)

```javascript
export const getAllUsers = async () => {
  try {
    const users = await adminAuth.listUsers(1000);
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    return null;
  }
};
```

**Descripción:**

- **Propósito:** Recupera una lista de hasta 1000 usuarios registrados en Firebase Authentication.
- **Proceso:**
  - Utiliza `adminAuth.listUsers(1000)` para listar los usuarios.
- **Retorno:**
  - Si tiene éxito, devuelve un objeto que contiene la lista de usuarios.
  - Si falla, devuelve `null` y registra el error en la consola.

### 3. Actualizar Usuario (`updateUser`)

```javascript
export const updateUser = async (uid: string, data: any) => {
  try {
    await adminAuth.updateUser(uid, data);
    console.log("Successfully updated user:", uid);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
};
```

**Descripción:**

- **Propósito:** Actualiza la información de un usuario existente, lo cual puede incluir cambios en el email, contraseña u otros atributos.
- **Parámetros:**
  - `uid`: Identificador único del usuario a actualizar.
  - `data`: Objeto que contiene los campos y valores a actualizar.
- **Proceso:**
  - Utiliza `adminAuth.updateUser` para actualizar los datos del usuario especificado.
- **Retorno:**
  - Si tiene éxito, devuelve `true`.
  - Si falla, devuelve `false` y registra el error en la consola.

### 4. Deshabilitar Usuario (`deleteUser`)

```javascript
export const deleteUser = async (uid: string) => {
  try {
    await adminAuth.updateUser(uid, { disabled: true });
    console.log("Successfully deleted user:", uid);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
```

**Descripción:**

- **Propósito:** Deshabilita (en lugar de eliminar permanentemente) la cuenta de un usuario, impidiendo que pueda iniciar sesión.
- **Parámetros:**
  - `uid`: Identificador único del usuario a deshabilitar.
- **Proceso:**
  - Utiliza `adminAuth.updateUser` para establecer `disabled: true` en la cuenta del usuario.
- **Retorno:**
  - Si tiene éxito, devuelve `true`.
  - Si falla, devuelve `false` y registra el error en la consola.

**Nota:** La eliminación permanente de usuarios debe tratarse con precaución y discutirse antes de su implementación.

### 5. Crear Administrador (`createAdmin`)

```javascript
export const createAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await adminAuth.createUser({
      email: email,
      password: password,
    });
    console.log("Successfully created new user:", userCredential.uid);

    // Establecer custom claims para el administrador
    adminAuth.setCustomUserClaims(userCredential.uid, {
      admin: true,
      master: false,
      blogger: false,
      seller: false,
    });
    return userCredential;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
```

**Descripción:**

- **Propósito:** Crea un nuevo usuario con privilegios de administrador.
- **Proceso:**
  - Crea el usuario utilizando `adminAuth.createUser`.
  - Establece el custom claim `admin: true` para otorgarle privilegios de administrador.
- **Retorno:**
  - Si tiene éxito, devuelve el objeto `userCredential`.
  - Si falla, devuelve `null` y registra el error en la consola.

### 6. Iniciar Sesión de Usuario (`loginUser`)

```javascript
export const loginUser = async (email: string, password: string) => {
  try {
    // Autenticar al usuario con Firebase Client SDK
    const user = await signInWithEmailAndPassword(auth, email, password);

    // Obtener el token de ID del usuario autenticado
    const idToken = await user.user.getIdToken();

    // Definir el tiempo de expiración de la cookie de sesión (5 días)
    const expirationTime = 60 * 60 * 24 * 5 * 1000;

    // Crear una cookie de sesión utilizando el token de ID
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: expirationTime,
    });

    // Configurar las opciones de la cookie
    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expirationTime,
      httpOnly: true,
      secure: true,
      sameSite: "strict" as "strict",
    };

    // Establecer la cookie en el cliente
    cookies().set(options);

    console.log("Successfully logged in user:", user.user);

    // Cerrar la sesión en el cliente para seguridad
    signOut(auth);

    return user.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};
```

**Descripción:**

- **Propósito:** Autentica al usuario y establece una sesión segura utilizando una cookie de sesión.
- **Proceso:**
  - Utiliza `signInWithEmailAndPassword` del Firebase Client SDK para autenticar al usuario con email y contraseña.
  - Obtiene el token de ID del usuario autenticado.
  - Define una duración de expiración para la sesión (5 días en milisegundos).
  - Crea una cookie de sesión segura mediante `adminAuth.createSessionCookie`.
  - Configura y establece la cookie en el cliente para mantener la sesión activa.
  - Cierra la sesión en el cliente (Firebase Client SDK) con `signOut` por razones de seguridad, ya que la sesión se manejará mediante la cookie en el servidor.
- **Retorno:**
  - Si tiene éxito, devuelve el objeto `user.user` que contiene información del usuario autenticado.
  - Si falla, devuelve `null` y registra el error en la consola.

### 7. Verificación de Seguridad de la Sesión (`securityCheck`)

```javascript
export const securityCheck = async (token: string) => {
  try {
    const session = cookies().get("session");
    if (!session) {
      return false;
    }

    // Verificar y decodificar la cookie de sesión
    const decodedToken = await adminAuth.verifySessionCookie(
      session.value,
      true
    );

    // Obtener información actualizada del usuario
    const user = await adminAuth.getUser(decodedToken.uid);
    const parsed = user.toJSON();
    return parsed;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
```

**Descripción:**

- **Propósito:** Verifica la validez de la sesión del usuario mediante la cookie de sesión y obtiene la información del usuario.
- **Parámetros:**
  - `token`: No se utiliza en la implementación actual y podría eliminarse o adaptarse según sea necesario.
- **Proceso:**
  - Intenta obtener la cookie de sesión llamada `"session"`.
  - Si la cookie no existe, devuelve `false`, indicando que no hay sesión activa.
  - Utiliza `adminAuth.verifySessionCookie` para verificar y decodificar la cookie de sesión.
    - El segundo parámetro `true` asegura que se verifique si el token ha sido revocado.
  - Obtiene la información actualizada del usuario mediante `adminAuth.getUser`.
  - Convierte el objeto del usuario a JSON para facilitar su manejo.
- **Retorno:**
  - Si tiene éxito, devuelve el objeto `parsed` que contiene la información del usuario.
  - Si falla, devuelve `null` y registra el error en la consola.

## Notas Adicionales

- **Custom Claims (Reclamaciones Personalizadas):**
  - Se utilizan para asignar roles y permisos a los usuarios.
  - Las propiedades utilizadas son:
    - `admin`
    - `master`
    - `blogger`
    - `seller`
  - Todas son booleanas y definen los privilegios que tiene el usuario en la aplicación.
- **Manejo de Sesiones:**
  - Se prefieren cookies de sesión seguras (`httpOnly`, `secure`, `sameSite: 'strict'`) para mantener las sesiones de usuario.
  - Al iniciar sesión, se crea una cookie de sesión en el servidor y se elimina la sesión en el cliente para prevenir conflictos y mejorar la seguridad.
- **Seguridad:**
  - Es fundamental manejar adecuadamente los tokens y las sesiones para proteger la información de los usuarios.
  - Siempre se debe verificar y validar los tokens antes de proporcionar acceso a recursos protegidos.
- **Consideraciones para Producción:**
  - Asegurarse de establecer correctamente las variables de entorno y la configuración de Firebase.
  - Revisar las políticas de seguridad y reglas de acceso en Firebase para evitar vulnerabilidades.
