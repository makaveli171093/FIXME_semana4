import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/authStore";
import type { Rol } from "../types";

interface RutaProtegidaProps {
  rolesPermitidos?: Rol[];
}

export default function RutaProtegida({ rolesPermitidos }: RutaProtegidaProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const usuario = useAuthStore((s) => s.usuario);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && (!usuario || !rolesPermitidos.includes(usuario.rol))) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
}
