"use client";

import React, { useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

interface State {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialState: State = {
  email: "",
  password: "",
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [state.error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      // Simulate an authentication request (replace with your actual authentication logic)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      if (state.email === "test@example.com" && state.password === "password") {
        // Successful login - you'd typically store a token or user info here
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({ type: "RESET" }); // Clear the form
        router.push("/dashboard"); // Redirect to dashboard or desired page
      } else {
        dispatch({ type: "SET_ERROR", payload: "Invalid email or password." });
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Login failed.",
      });
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
            <h2 className="text-center mb-4">Iniciar Sesion</h2>

            <form onSubmit={handleSubmit}>
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

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={state.loading}
                >
                  {state.loading ? " Iniciando..." : "Iniciar Sesion"}
                </button>
              </div>
            </form>

            <p className="text-center mt-3">
              No te has registrado?{" "}
              <Link href="/register" legacyBehavior>
                <a>Registrarse</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
