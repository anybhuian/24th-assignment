
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],

      addFavorite: (user) =>
        set((state) => ({
          favorites: [...state.favorites, user],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (user) => user.id !== id
          ),
        })),

      toggleFavorite: (user) =>
        set((state) => {
          const exists = state.favorites.some(
            (item) => item.id === user.id
          );

          return {
            favorites: exists
              ? state.favorites.filter(
                  (item) => item.id !== user.id
                )
              : [...state.favorites, user],
          };
        }),
    }),
    {
      name: "favorite-users",
    }
  )
);

export default useFavoriteStore;
