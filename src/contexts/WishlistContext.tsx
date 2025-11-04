import React, { createContext, useContext, useState, useEffect } from "react";

interface Game {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
  genre: string;
}

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === game.id)) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist((prev) => prev.filter((game) => game.id !== gameId));
  };

  const isInWishlist = (gameId: string) => {
    return wishlist.some((game) => game.id === gameId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
