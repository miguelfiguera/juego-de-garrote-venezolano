"use client";

import React, { useReducer, useEffect } from "react";
import { create } from "@/lib/firebase/collections/profiles";
import { useRouter } from "next/navigation";
import useSessionStore from "@/lib/zustand/userDataState";
import { toast } from "react-toastify";

interface State {
  name: string;
  lastname: string;
  address: string;
  age: number;
  country: string;
  status: string;
  role: "aprendiz" | "instructor" | "maestro";
  yearsInTheGame: number;
  biography: string;
  zipcode: string;
  phone: string;
  email: string;
  style: string;
  userId: string;
  masterId: string | null;
  nationalIdNumber: string; // Added nationalIdNumber
  loading: boolean;
  error: string | null;
  photoUrl: string;
}

type Action =
  | { type: "SET_NOMBRE"; payload: string }
  | { type: "SET_APELLIDO"; payload: string }
  | { type: "SET_DIRECCION"; payload: string }
  | { type: "SET_EDAD"; payload: number }
  | { type: "SET_ESTADO"; payload: string }
  | { type: "SET_ROL"; payload: "aprendiz" | "instructor" | "maestro" }
  | { type: "SET_ANHOS_EN_EL_JUEGO"; payload: number }
  | { type: "SET_BIOGRAFIA"; payload: string }
  | { type: "SET_CODIGO_POSTAL"; payload: string }
  | { type: "SET_TELEFONO"; payload: string }
  | { type: "SET_CORREO_ELECTRONICO"; payload: string }
  | { type: "SET_ESTILO"; payload: string }
  | { type: "SET_ID_USUARIO"; payload: string }
  | { type: "SET_ID_MAESTRO"; payload: string | null }
  | { type: "SET_FOTO_PERFIL"; payload: string }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_NUMERO_DE_IDENTIFICACION_NACIONAL"; payload: string } // Added Action
  | { type: "SET_CARGANDO"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: State = {
  name: "",
  lastname: "",
  address: "",
  age: 0,
  status: "",
  role: "aprendiz",
  yearsInTheGame: 0,
  biography: "",
  zipcode: "",
  phone: "",
  email: "",
  style: "",
  userId: "",
  masterId: null,
  nationalIdNumber: "", // Initial Value
  loading: false,
  error: null,
  photoUrl: "",
  country: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NOMBRE":
      return { ...state, name: action.payload };
    case "SET_APELLIDO":
      return { ...state, lastname: action.payload };
    case "SET_DIRECCION":
      return { ...state, address: action.payload };
    case "SET_EDAD":
      return { ...state, age: action.payload };
    case "SET_ESTADO":
      return { ...state, status: action.payload };
    case "SET_ROL":
      return { ...state, role: action.payload };
    case "SET_ANHOS_EN_EL_JUEGO":
      return { ...state, yearsInTheGame: action.payload };
    case "SET_BIOGRAFIA":
      return { ...state, biography: action.payload };
    case "SET_CODIGO_POSTAL":
      return { ...state, zipcode: action.payload };
    case "SET_TELEFONO":
      return { ...state, phone: action.payload };
    case "SET_CORREO_ELECTRONICO":
      return { ...state, email: action.payload };
    case "SET_ESTILO":
      return { ...state, style: action.payload };
    case "SET_ID_USUARIO":
      return { ...state, userId: action.payload };
    case "SET_ID_MAESTRO":
      return { ...state, masterId: action.payload };
    case "SET_NUMERO_DE_IDENTIFICACION_NACIONAL":
      return { ...state, nationalIdNumber: action.payload }; // Added Case
    case "SET_CARGANDO":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_FOTO_PERFIL":
      return { ...state, photoUrl: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const ProfileForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userUid } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (userUid) {
      dispatch({ type: "SET_ID_USUARIO", payload: userUid });
    }
  }, [userUid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_CARGANDO", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    if (!userUid) {
      dispatch({ type: "SET_ERROR", payload: "User UID not found" });
      dispatch({ type: "SET_CARGANDO", payload: false });
      return;
    }

    if (!state.role) {
      dispatch({ type: "SET_ERROR", payload: "Role not found" });
      dispatch({ type: "SET_CARGANDO", payload: false });
      return;
    }

    try {
      await create({
        name: state.name,
        lastname: state.lastname,
        address: state.address,
        age: state.age,
        status: state.status,
        role: state.role,
        yearsInTheGame: state.yearsInTheGame,
        biography: state.biography,
        zipcode: state.zipcode,
        phone: state.phone,
        email: state.email,
        style: state.style,
        userId: userUid,
        masterId: state.masterId,
        nationalIdNumber: state.nationalIdNumber, // Added nationalIdNumber
        photoUrl: state.photoUrl,
        country: state.country,
      });

      dispatch({ type: "RESET" });
      router.push("/profile");
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Fallo al crear perfil",
      });
    } finally {
      dispatch({ type: "SET_CARGANDO", payload: false });
    }
  };

  const showInstructions = () => {
    toast.info(
      "Sube tu foto de perfil a un servicio de almacenamiento gratuito y coloca la URL en el campo correspondiente."
    );
  };

  return (
    <div className="container mt-4 py-5">
      <h2>Crear Perfil</h2>
      {state.error && <div className="alert alert-danger">{state.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NOMBRE", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido:
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            value={state.lastname}
            onChange={(e) =>
              dispatch({ type: "SET_APELLIDO", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edad" className="form-label">
            Edad:
          </label>
          <input
            type="number"
            className="form-control"
            id="edad"
            value={state.age}
            onChange={(e) =>
              dispatch({
                type: "SET_EDAD",
                payload: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección:
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={state.address}
            onChange={(e) =>
              dispatch({ type: "SET_DIRECCION", payload: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado:
          </label>
          <input
            type="text"
            className="form-control"
            id="estado"
            value={state.status}
            onChange={(e) =>
              dispatch({ type: "SET_ESTADO", payload: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            Pais:
          </label>
          <input
            type="text"
            className="form-control"
            id="pais"
            value={state.country}
            onChange={(e) =>
              dispatch({ type: "SET_COUNTRY", payload: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codigoPostal" className="form-label">
            Código Postal:
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoPostal"
            value={state.zipcode}
            onChange={(e) =>
              dispatch({ type: "SET_CODIGO_POSTAL", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol:
          </label>
          <select
            className="form-select"
            id="rol"
            value={state.role}
            onChange={(e) =>
              dispatch({
                type: "SET_ROL",
                payload: e.target.value as
                  | "aprendiz"
                  | "instructor"
                  | "maestro",
              })
            }
          >
            <option value={"aprendiz"}>Aprendiz</option>
            <option value={"instructor"}>Instructor</option>
            <option value={"maestro"}>Maestro</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="anhosEnElJuego" className="form-label">
            Años en el Juego:
          </label>
          <input
            type="number"
            className="form-control"
            id="anhosEnElJuego"
            value={state.yearsInTheGame}
            onChange={(e) =>
              dispatch({
                type: "SET_ANHOS_EN_EL_JUEGO",
                payload: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="biografia" className="form-label">
            Biografía:
          </label>
          <textarea
            className="form-control"
            id="biografia"
            value={state.biography}
            onChange={(e) =>
              dispatch({ type: "SET_BIOGRAFIA", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono:
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={state.phone}
            onChange={(e) =>
              dispatch({ type: "SET_TELEFONO", payload: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            Foto de perfil (URL){" "}
            <button className="btn btn-success" onClick={showInstructions}>
              Instrucciones
            </button>
            :
          </label>
          <input
            type="text"
            className="form-control"
            id="photoUrl"
            onChange={(e) =>
              dispatch({ type: "SET_FOTO_PERFIL", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">
            Correo Electrónico (de contacto):
          </label>
          <input
            type="email"
            className="form-control"
            id="correoElectronico"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "SET_CORREO_ELECTRONICO",
                payload: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estilo" className="form-label">
            Estilo de Juego de Garrote (N/A si no aplica):
          </label>
          <input
            type="text"
            className="form-control"
            id="estilo"
            value={state.style}
            onChange={(e) =>
              dispatch({ type: "SET_ESTILO", payload: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="numeroDeIdentificacionNacional"
            className="form-label"
          >
            Número de Identificación Nacional:
          </label>
          <input
            type="text"
            className="form-control"
            id="numeroDeIdentificacionNacional"
            value={state.nationalIdNumber}
            onChange={(e) =>
              dispatch({
                type: "SET_NUMERO_DE_IDENTIFICACION_NACIONAL",
                payload: e.target.value,
              })
            }
          />
        </div>

        {userUid && (
          <div className="mb-3">
            <label htmlFor="idUsuario" className="form-label">
              ID Usuario:
            </label>
            <input
              type="text"
              className="form-control"
              id="idUsuario"
              value={userUid}
              readOnly
            />
          </div>
        )}

        {/*         <div className="mb-3">
          <label htmlFor="idMaestro" className="form-label">
            ID Maestro:
          </label>
          <input
            type="text"
            className="form-control"
            id="idMaestro"
            value={state.masterId || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_ID_MAESTRO",
                payload: e.target.value || null,
              })
            }
          />
        </div> */}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.loading}
        >
          {state.loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
