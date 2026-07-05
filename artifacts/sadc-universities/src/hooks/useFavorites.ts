import { useState, useEffect } from "react";

const STORAGE_KEY = "sadc-favorites";

export type Favorite = {
  universityName: string;
  countryId: string;
  countryName: string;
  countryFlag: string;
};

function load(): Favorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Favorite[]) : [];
  } catch {
    return [];
  }
}

function save(favs: Favorite[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>(load);

  useEffect(() => {
    save(favorites);
  }, [favorites]);

  function isFavorite(universityName: string) {
    return favorites.some((f) => f.universityName === universityName);
  }

  function toggle(fav: Favorite) {
    setFavorites((prev) =>
      prev.some((f) => f.universityName === fav.universityName)
        ? prev.filter((f) => f.universityName !== fav.universityName)
        : [...prev, fav]
    );
  }

  function clear() {
    setFavorites([]);
  }

  return { favorites, isFavorite, toggle, clear };
}
