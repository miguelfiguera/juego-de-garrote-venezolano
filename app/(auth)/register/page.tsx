"use client";

import React, { useReducer } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { createUser, searchUserByEmail } from "@/lib/firebase/admin/auth";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean; // Added agreeTerms
  loading: boolean;
  error: string | null;
  name: string;
  lastName: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_AGREE_TERMS"; payload: boolean } // Added SET_AGREE_TERMS
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_LASTNAME"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false, // Initial state for terms agreement
  loading: false,
  error: null,
  name: "",
  lastName: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_AGREE_TERMS":
      return { ...state, agreeTerms: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_LASTNAME":
      return { ...state, lastName: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", payload: "Las contraseñas no coinciden." });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        payload: "La contraseña debe tener al menos 6 caracteres",
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    if (!state.agreeTerms) {
      dispatch({
        type: "SET_ERROR",
        payload: "You must agree to the terms and conditions.",
      });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    try {
      // Check if the email already exists
      const userExists = await searchUserByEmail(state.email);
      if (userExists) {
        dispatch({
          type: "SET_ERROR",
          payload: "El correo electrónico ya está registrado.",
        });
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      // creates user saving credentials on firebase
      /* const newUser = */
      await createUser(state.email, state.password, state.name, state.lastName);

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({ type: "RESET" });
      router.push("/login"); // Redirect to login Page after successful registration
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.toString() || "Login failed.",
        });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "Error desconocido, contactar al administrador.",
        });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-6">
        <div className="card shadow-lg p-3">
          <div className="card-body">
            <h2 className="text-center mb-4">Registro</h2>

            {state.error && (
              <div className="alert alert-danger">{state.error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(e) =>
                    dispatch({ type: "SET_NAME", payload: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Apellido:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={(e) =>
                    dispatch({ type: "SET_LASTNAME", payload: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({ type: "SET_EMAIL", payload: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={state.password}
                  onChange={(e) =>
                    dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={state.confirmPassword}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CONFIRM_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  checked={state.agreeTerms}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_AGREE_TERMS",
                      payload: e.target.checked,
                    })
                  }
                  required // Make it required for submission
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  Acepto los{" "}
                  <Link href="/terms" legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      Terminos y condiciones
                    </a>
                  </Link>{" "}
                  y las{" "}
                  <Link href="/privacy" legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      Politica de privacidad
                    </a>
                  </Link>
                </label>
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={state.loading}
                >
                  {state.loading ? "Creando cuenta..." : "Registrarse"}
                </button>
              </div>
            </form>

            <p className="text-center mt-3">
              Tienes cuenta?{" "}
              <Link href="/login" legacyBehavior>
                <a>Iniciar Sesion</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
