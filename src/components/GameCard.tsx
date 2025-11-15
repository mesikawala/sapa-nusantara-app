import { Button } from "./ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { calculateDiscount } from "@/lib/priceUtils";

interface GameCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
  genre: string;
  slug?: string;
}

const GameCard = ({ id, title, price, image, rating, genre, slug }: GameCardProps) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const discountedPrices = isLoggedIn ? calculateDiscount(price, 20) : null;

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(id);
      toast.success("Dihapus dari wishlist");
    } else {
      addToWishlist({ id, title, price, image, rating, genre });
      toast.success("Ditambahkan ke wishlist");
    }
  };

  return (
    <div className="group gradient-card rounded-md overflow-hidden shadow-card transition-smooth hover:scale-105 hover:glow-primary border border-border">
      <div 
        className="relative overflow-hidden aspect-square cursor-pointer"
        onClick={() => slug && navigate(`/game/${slug}`)}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute top-1.5 right-1.5 bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold">
          {isLoggedIn && discountedPrices ? (
            <div className="flex flex-col items-end gap-0.5">
              <span className="line-through text-[8px] md:text-[10px] opacity-70">{price}</span>
              <span className="text-[10px] md:text-xs">{discountedPrices.discounted}</span>
            </div>
          ) : (
            <span>{price}</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick();
          }}
          className="absolute top-1.5 left-1.5 p-1 md:p-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border transition-smooth hover:scale-110"
        >
          <Heart 
            className={`h-3 w-3 md:h-4 md:w-4 transition-smooth ${
              inWishlist ? "fill-destructive text-destructive" : "text-foreground"
            }`}
          />
        </button>
      </div>
      
      <div className="p-2 md:p-3">
        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
          <span className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider truncate">{genre}</span>
          <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
            <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-secondary text-secondary" />
            <span className="text-[10px] md:text-xs font-semibold">{rating}</span>
          </div>
        </div>
        
        <h3 
          className="text-xs md:text-sm font-bold mb-2 text-foreground group-hover:text-primary transition-smooth line-clamp-2 cursor-pointer"
          onClick={() => slug && navigate(`/game/${slug}`)}
        >
          {title}
        </h3>
        
        <Button 
          variant="hero" 
          size="sm" 
          className="w-full h-7 md:h-8 text-[10px] md:text-xs px-2"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/payment/${id}`);
          }}
        >
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden md:inline">Beli Sekarang</span>
          <span className="md:hidden">Beli</span>
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
