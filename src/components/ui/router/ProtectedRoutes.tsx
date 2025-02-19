import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust based on your Redux store setup
import { Storages } from "@/lib/helpers";
import { StorageKeysEnum, UserInt } from "@/types";
const ProtectedRoute = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.user);

  // Check Redux state first, then localStorage
  const storedUser = Storages.getStorage('local',StorageKeysEnum.isAuthenticated)// Replace "user" with your localStorage key
  const isUserAuthenticated = isAuthenticated|| (storedUser as UserInt)?.user?.authenticated;

  // Redirect to login if no authenticated user is found
  if (!isUserAuthenticated) {
    return <Navigate to="/enter" replace />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
