import { useUserStore } from "../config/zustand";
import { logoutApi } from "../services/authService";
export const isAuthenticated = (): boolean => {
  const token = useUserStore.getState().user?.token;
  return !!token;
};

export const getRole = (): number | null => {
  const userData = useUserStore.getState().user?.roleId;
  let user = userData ?? null;
  return user;
};

export const checkRole = (roleId: number): boolean => {
  return getRole() === roleId;
};

export const hasAnyRole = (...roles: number[]): boolean => {
  return roles.includes(getRole() || 0);
};

export const logout = () => {
  // Use Zustand clearUser instead of manual localStorage removal
  useUserStore.getState().clearUser();

  sessionStorage.setItem("toastMessage", JSON.stringify({
    type: "success",
    message: "Logout Successfully!",
  }));
  logoutApi();
  window.location.href = "/";
};
