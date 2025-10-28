import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// import { API_CONTANTS } from '../constants/apiContants';

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isSidebarOpen: false,
  toggleSidebar: () => {
    const { isSidebarOpen } = get();
    set({ isSidebarOpen: !isSidebarOpen });
  },
  closeSidebar: () => set({ isSidebarOpen: false }),
}));


type LoadingState = {
  isLoadingFlag: boolean;
  setIsLoadingFlag: (isLoadingFlag: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoadingFlag: false,
  setIsLoadingFlag: (isLoadingFlag) => set({ isLoadingFlag }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    userId: number;
    roleId: number;
    roleName: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    isVerify: boolean;
    createdAt: string;
    locationAddress: string;
    locationCity: string;
    avatarUrl: string;
  };
}

interface UserState {
  user: {
    token: string | null;
    refreshToken: string | null;
    id: number;
    username: string;
    email: string;
    phone: string;
    role_code: string;
    roleId: number;
    avatarUrl: string;
    isActive: boolean;
    isVerify: boolean;
    createdAt: string;
    locationAddress: string;
    locationCity: string;
  } | null;
  setLoginData: (loginResponse: LoginResponse) => void;
  clearUser: () => void;
  getToken: () => string | null;
  getRefreshToken: () => string | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setLoginData: (loginResponse: LoginResponse) => {
        const userData = {
          token: loginResponse.token,
          refreshToken: loginResponse.refreshToken,
          id: loginResponse.user.userId,
          username: loginResponse.user.name,
          email: loginResponse.user.email,
          phone: loginResponse.user.phone,
          role_code: loginResponse.user.roleName,
          roleId: loginResponse.user.roleId,
          avatarUrl: loginResponse.user.avatarUrl,
          isActive: loginResponse.user.isActive,
          isVerify: loginResponse.user.isVerify,
          createdAt: loginResponse.user.createdAt,
          locationAddress: loginResponse.user.locationAddress,
          locationCity: loginResponse.user.locationCity,
        };
        set({ user: userData });
      },
      clearUser: () => {
        set({ user: null });
      },
      getToken: () => {
        const state = get();
        return state.user?.token || null;
      },
      getRefreshToken: () => {
        const state = get();
        return state.user?.refreshToken || null;
      },
      setToken: (token: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, token } : null,
        }));
      },
      setRefreshToken: (refreshToken: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, refreshToken } : null,
        }));
      },
    }),
    {
      name: 'user-storage', // localStorage key name
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);

