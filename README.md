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

## Notas del autor

La arquitectura de código es la que se usa comunmente en nextjs en proyectos pequeños, se separa cada pagina de acuerdo a su funcion principal y luego se hacen subcategorias a partir de alli.

Las funciones que deban correr en el servidor van en lib y dependiendo de su funcion se subdividen. En este caso estan las interfaces (modelos para el tipado seguro), firebase (admin sdk, firebase sdk y funciones de authentication) y zustand (persistencia de estados en client-side).

Este proyecto es una primera etapa del trabajo realizado y la idea es perfeccionarlo el semestre que viene, pero por ahora está en excelentes condiciones.

En estos momentos no cuenta con un middleware.js para control de uso debido a que la aplicacion esta 100% abierta para que la gente del patio ambrosio aguilar y los profesores de la UNETI puedan revisarla de forma rapida y sencilla.

Sin mas a que hacer referencia, pueden proseguir.

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

# Documentación de las Funciones CRUD para /firebase/collections/

Este documento describe el enfoque general de las funciones CRUD (Crear, Leer, Actualizar y Eliminar) utilizadas para gestionar todos los modelos presentes en la carpeta /firebase/collections en una aplicación que utiliza Firebase Firestore como base de datos.

## NOTA IMPORTANTE:

Escribir la misma documentacion por cada modelo es innecesario, asi que para simplificar la presentacion de estas funciones usaremos el modelo Investigacion.

Algunos modelos tienen metodos propios, pero en su mayoria estan comentados en ingles para sostener el proyecto y recordarle al desarrollador la razon por la cual esto existe como existe.

Las funciones incluidas son:

1. **index**: Listar todas las investigaciones.
2. **show**: Obtener una investigación específica por su ID.
3. **create**: Crear una nueva investigación.
4. **update**: Actualizar una investigación existente.
5. **destroy**: Eliminar una investigación.

Estas funciones son una estructura basica general para el manejo de data en firestore directamente desde el adminSDK para evitar exponer demasiada data al cliente.

---

## Inicialización

Se define una constante para el nombre de la colección de Firestore donde se almacenan los datos:

ejemplo:

```typescript
const INVESTIGATIONS_COLLECTION = "investigations";
```

Además, se importa `adminDb` para interactuar con la base de datos Firestore utilizando el SDK de administración de Firebase.

---

## 1. Función `index` (Listar Investigaciones)

```typescript
export async function index(): Promise<Investigation[]> { ... }
```

### Descripción

La función `index` recupera y devuelve una lista de todas las investigaciones almacenadas en la colección `investigations`.

### Detalles de Implementación

- **Recuperación de Datos**: Utiliza `adminDb.collection(INVESTIGATIONS_COLLECTION).get()` para obtener todos los documentos de la colección.
- **Transformación de Datos**: Mapea los documentos obtenidos a un arreglo de objetos del tipo `Investigation`, incluyendo el ID de cada documento.
  ```typescript
  const investigations: Investigation[] = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Investigation)
  );
  ```
- **Manejo de Errores**: Utiliza un bloque `try-catch` para capturar y manejar cualquier error que ocurra durante la operación.

---

## 2. Función `show` (Mostrar una Investigación Específica)

```typescript
export async function show(investigationId: string): Promise<Investigation | null> { ... }
```

### Descripción

La función `show` obtiene una investigación específica a partir de su ID.

### Detalles de Implementación

- **Recuperación de Datos**: Accede al documento con el ID proporcionado utilizando:
  ```typescript
  const doc = await adminDb
    .collection(INVESTIGATIONS_COLLECTION)
    .doc(investigationId)
    .get();
  ```
- **Validación de Existencia**: Verifica si el documento existe. Si no existe, devuelve `null`.
- **Transformación de Datos**: Si el documento existe, construye un objeto `Investigation` con el ID y los datos del documento.
- **Manejo de Errores**: Controla y lanza errores descriptivos en caso de fallos durante la operación.

---

## 3. Función `create` (Crear una Nueva Investigación)

```typescript
export async function create(investigationData: Omit<Investigation, "id" | "createdAt" | "updatedAt">): Promise<string> { ... }
```

### Descripción

La función `create` crea una nueva investigación en la base de datos y devuelve el ID del nuevo documento creado.

### Detalles de Implementación

- **Preparación de Datos**: Excluye los campos `id`, `createdAt` y `updatedAt` del objeto de datos recibido, ya que estos se generan automáticamente.
- **Marcas de Tiempo**: Agrega campos `createdAt` y `updatedAt` con la marca de tiempo actual:
  ```typescript
  const now = Date.now();
  ```
- **Creación del Documento**: Añade un nuevo documento a la colección utilizando:
  ```typescript
  const docRef = await adminDb.collection(INVESTIGATIONS_COLLECTION).add({
    ...investigationData,
    createdAt: now,
    updatedAt: now,
  });
  ```
- **Revalidación de Rutas**: Llama a `revalidatePath("/investigaciones")` para actualizar el contenido en la aplicación si se utiliza ISR (Incremental Static Regeneration) o similar.
- **Retorno**: Devuelve el ID del documento recién creado.
- **Manejo de Errores**: Controla errores potenciales y proporciona mensajes descriptivos.

---

## 4. Función `update` (Actualizar una Investigación Existente)

```typescript
export async function update(id: string, investigationData: Omit<Investigation, "id" | "createdAt" | "updatedAt">): Promise<void> { ... }
```

### Descripción

La función `update` actualiza los datos de una investigación existente identificada por su ID.

### Detalles de Implementación

- **Preparación de Datos**: Al igual que en `create`, excluye los campos `id`, `createdAt` y `updatedAt`.
- **Actualización de Datos**: Utiliza `adminDb.collection(INVESTIGATIONS_COLLECTION).doc(id).update({...})` para actualizar el documento con los nuevos datos y la marca de tiempo actual en `updatedAt`.
- **Revalidación de Rutas**:
  - Actualiza la lista general de investigaciones: `revalidatePath("/investigaciones")`.
  - Actualiza la página específica de la investigación actualizada: `revalidatePath(`/investigaciones/${id}`)`.
- **Manejo de Errores**: Controla y lanza errores en caso de que la actualización falle.

---

## 5. Función `destroy` (Eliminar una Investigación)

```typescript
export async function destroy(id: string): Promise<void> { ... }
```

### Descripción

La función `destroy` elimina una investigación de la base de datos utilizando su ID.

### Detalles de Implementación

- **Eliminación del Documento**: Utiliza `adminDb.collection(INVESTIGATIONS_COLLECTION).doc(id).delete()` para eliminar el documento.
- **Revalidación de Rutas**: Llama a `revalidatePath("/investigaciones")` para actualizar la lista de investigaciones en la aplicación.
- **Manejo de Errores**: Controla errores y proporciona mensajes específicos si la eliminación falla.

---

## Manejo Común de Errores

En todas las funciones:

- Se utiliza un bloque `try-catch` para capturar errores.
- Se verifica si el error es una instancia de `Error` para proporcionar mensajes detallados.
- Se registra el error en la consola con `console.error`.
- Se lanza un nuevo `Error` para que pueda ser manejado por la función o componente que llamó.

---

## Revalidación de Rutas

Las funciones `create`, `update` y `destroy` incluyen llamadas a `revalidatePath` para asegurar que la aplicación actualice la información presentada a los usuarios después de realizar cambios en la base de datos. Esto es especialmente relevante en aplicaciones que usan renderizado estático o generación estática incremental.

- **Lista de Investigaciones**: Siempre se revalida la ruta `"/investigaciones"` para reflejar cambios en la lista general.
- **Detalle de Investigación**: En la función `update`, también se revalida la ruta específica de la investigación actualizada.

---

## Resumen del Enfoque CRUD

- **Create (Crear)**:

  - Crea un nuevo documento en la colección `investigations`.
  - Asigna marcas de tiempo para `createdAt` y `updatedAt`.
  - Revalida las rutas necesarias para actualizar la interfaz de usuario.

- **Read (Leer)**:

  - **index**: Recupera todos los documentos de la colección y devuelve una lista de investigaciones.
  - **show**: Recupera un documento específico basado en su ID.

- **Update (Actualizar)**:

  - Actualiza campos existentes en un documento identificado por su ID.
  - Actualiza la marca de tiempo `updatedAt`.
  - Revalida las rutas afectadas.

- **Delete (Eliminar)**:
  - Elimina un documento de la colección basado en su ID.
  - Revalida la lista de investigaciones.

---

## Consideraciones Generales

- **Seguridad**: Estas funciones se ejecutan en el servidor y utilizan el SDK de administración de Firebase, por lo que deben protegerse adecuadamente para evitar accesos no autorizados.
- **Tipos de Datos**: Se utiliza el tipo `Investigation` para tipar los datos de las investigaciones. Se omiten ciertos campos en las operaciones de creación y actualización para evitar inconsistencias.
- **Estructura del Código**:
  - Uso consistente de estructuras `try-catch` para manejo de errores.
  - Mensajes de error claros y detallados para facilitar la depuración.
  - Uso de funciones asíncronas (`async/await`) para manejar las operaciones de E/S con la base de datos.

---

## Uso de las Funciones en la Aplicación

Estas funciones pueden ser importadas y utilizadas en distintos componentes o rutas de la aplicación, facilitando la interacción con la base de datos de investigaciones. Por ejemplo:

- **Enrutadores**: Para manejar las solicitudes HTTP correspondientes a cada operación CRUD.
- **Componentes de React**: Para obtener y presentar datos en la interfaz de usuario.
- **Servicios**: Como parte de una capa de servicios que abstrae las operaciones de datos.

---

# INTERFACES (Estructura de Modelos para las Firebase collections)
