import "./App.css";
// import Header from "./layouts/Header/Header";
// import Footer from "./layouts/Footer/Footer";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./routers/ProtectedRouted";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { useLoadingStore } from "./config/zustand";
import useToastStorage from "./hooks/useToastStorage";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import UserManagement from "./pages/Admin/UsersManagement/UserManagement";
import BlogsManagement from "./pages/Admin/BlogsManagement/BlogsManagement";
import PhotographerApplication from "./pages/Admin/PhotographerApplication/PhotographerApplication";
import AboutUs from "./pages/Main/AboutUs/AboutUs";
import BlogPage from "./pages/Main/BlogPage/BlogPage";
import { Contact } from "lucide-react";
import SnaperPage from "./pages/Main/SnaperPage/SnaperPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", 
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/snaper",
        element: <SnaperPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <ProtectedRoute requireAdmin={true}>
      <AdminLayout />
      // </ProtectedRoute>
    ),
    errorElement: <AdminDashboard />,
    children: [
      {
        path: "/admin/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/user-management",
        element: <UserManagement />,
      },
      {
        path: "/admin/blogs-management",
        element: <BlogsManagement />,
      },
      {
        path: "/admin/photographer-applications",
        element: <PhotographerApplication />,
      },
    ],
  },
]);
const App: React.FC = () => {
  const loading = useLoadingStore((state) => state.loading);

  useToastStorage();
  return (
    <div className="w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
