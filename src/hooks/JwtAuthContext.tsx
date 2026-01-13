import { createContext, useEffect, useReducer, useState } from "react";
import { apiServer, getProfile } from "./apiServer";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user };
    }

    case "LOGIN": {
      return { ...state, isAuthenticated: true, user: action.payload.user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const JwtAuthContext = createContext({
  ...initialState,
  loading: false,
  signIn: (username: string, password: string) => {},
  signUp: (username: string, password: string) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // await verifyToken();
        const user = await getProfile();
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: true, user: user },
        });
      } catch {
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      await apiServer.post("/authentication", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      navigate("/dashboard");
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, password: string) => {
    setLoading(true);
    try {
      await apiServer.post("/api/register", { username, password });
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    navigate("/");
  };

  return (
    <JwtAuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </JwtAuthContext.Provider>
  );
};

export default JwtAuthContext;
