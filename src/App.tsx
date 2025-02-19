import { createBrowserRouter, createRoutesFromElements, Link, Route, Outlet } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ui/router/ProtectedRoutes";
import DashboardLayout from "./pages/dashboard";
import Overview from "./pages/dashboard/components/Overview";
import { Toaster } from "./components/ui/toaster";
import Tenants from "./pages/dashboard/tenants";
import Properties from "./pages/dashboard/Properties/index";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import Leases from "./pages/Leases";
import Reports from "./pages/Reports";
import SetUpEstate from "./pages/SetUpEstate";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-4">Oops! Page not found</p>
      <Link 
        to="/enter"
        className="text-blue-500 hover:text-blue-600 underline"
      >
        Go back home
      </Link>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement ={<div>something went wrong</div>}>
      <Route path="/register" element={<Signup />} />
      <Route path="/enter" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />} path="d">
          <Route element={<Overview />} index />
          <Route element={<Tenants />} path="tenants" />
          <Route element={<Properties />} path="properties" />
          <Route element={<Payments />} path="payments" />
           <Route element={<Leases />} path="leases" />
          <Route element={<Reports />} path="reports" />
          <Route element={<Maintenance />} path="maintenance" />
        </Route>
        <Route path="/estate-setup" element={<SetUpEstate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;