import { Navigate } from "react-router-dom";
import { useGeneral } from "../context/GeneralContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useGeneral();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return user ? children : <Navigate to="/login" />;
}