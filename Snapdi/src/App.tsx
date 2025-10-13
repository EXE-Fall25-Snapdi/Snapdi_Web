import "./App.css";
// import Header from "./layouts/Header/Header";
// import Footer from "./layouts/Footer/Footer";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';
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
import TransactionHistory from "./pages/Admin/TransactionHistory/TransactionHistory";
import AboutUs from "./pages/Main/AboutUs/AboutUs";
import BlogPage from "./pages/Main/BlogPage/BlogPage";
import BlogDetail from "./pages/Main/BlogDetail/BlogDetail";
import SnaperPage from "./pages/Main/SnaperPage/SnaperPage";
import Contact from "./pages/Main/Contact/Contact";
import Login from "./pages/Auth/Login/Login";
import { Spin } from "antd";
import { HelmetProvider } from '@dr.pogodin/react-helmet';
// import ChatBubble from "./components/ChatBubble";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
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
        path: "/blog/:blogId",
        element: <BlogDetail />,
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
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      // </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "blogs-management",
        element: <BlogsManagement />,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory />,
      },
      {
        path: "photographer-applications",
        element: <PhotographerApplication />,
      },
      {
        path: "*",
        element: <NotFound />, // Fallback for any unmatched admin routes
      },
    ],
  },
]);
const App: React.FC = () => {
  const loading = useLoadingStore((state) => state.loading);
  useToastStorage();
  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#34D399',
          },
        }}
      >
        <div className="w-full">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
              <Spin size="default" />
            </div>
          )}
          <RouterProvider router={router} />
          {/* <ChatBubble /> */}
          <ToastContainer
            className="text-sm z-9999"
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Analytics />
          <SpeedInsights />
        </div>
      </ConfigProvider>
    </HelmetProvider>
  );
};
export default App;
