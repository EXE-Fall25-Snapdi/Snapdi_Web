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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ path: "/", element: <MainPage /> }],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
      <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <MainPage />,
    children: [
      {
        path: "/admin/dashboard",
        element: <NotFound />,
      },
      {
        path: "/admin/users",
        element: <NotFound />,
      },
      {
        path: "/admin/blogs",
        element: <NotFound />,
      },
    ],
  },
]);
const App: React.FC = () => {
  const loading = useLoadingStore((state) => state.loading);

  useToastStorage();
  return (
    <div className="App">
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
