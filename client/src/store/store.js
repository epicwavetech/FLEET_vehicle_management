import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
  devtools((set) => ({
    // For theme
    darkMode: true,
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

    // Active menu item
    activeMenuItem: null,
    setActiveMenuItem: (item) => set({ activeMenuItem: item }),

    //Admin Info
    _id: null,
    name: null,
    email: null,
    password: null,
    token: null,

    //expiring docs
    expiringDocs: [],
    setExpiringDocs: (items) => set({ expiringDocs: items }),

    //all clients
    clients: [],
    setClients: (items) => set({ clients: items }),

    //single client vehicle data
    singleClientVehicle: [],
    setSingleClientVehicle: (items) => set({ singleClientVehicle: items }),

    //task
    tasks: [],
    setTasks: (items) => set({ tasks: items }),

    //contacts
    contacts: [],
    setContacts: (items) => set({ contacts: items }),

    //login
    isLogin: null,
    setIsLogin: (item) => set({ isLogin: item }),
  }))
);

export const SERVER_URL = "https://vehicle-management-server-axkf.onrender.com";
