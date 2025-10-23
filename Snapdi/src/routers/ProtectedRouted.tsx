import React from "react";

import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { checkRole, isAuthenticated } from "../utils/userUtils";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  requireApproval?: boolean;
  requireEditProfile?: boolean;
  requireFinance?: boolean;
  requireUser?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAdmin,
  requireApproval,
  requireFinance,
  children,
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin-login" />;
  }

  if (requireAdmin && !checkRole(1)) {
    toast.error("You do not have access to this page.");
    return <Navigate to="/" />;
  }

  if (requireApproval && !checkRole(3)) {
    toast.error("You do not have access to this page.");
    return <Navigate to="/" />;
  }

  if (requireFinance && !checkRole(2)) {
    toast.error("You do not have access to this page.");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
