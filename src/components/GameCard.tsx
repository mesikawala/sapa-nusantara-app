import { Button } from "./ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface GameCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
  genre: string;
}

const GameCard = ({ id, title, price, image, rating, genre }: GameCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

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
    <div className="group gradient-card rounded-lg overflow-hidden shadow-card transition-smooth hover:scale-105 hover:glow-primary border border-border">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold">
          {price}
        </div>
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 left-3 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border transition-smooth hover:scale-110"
        >
          <Heart 
            className={`h-5 w-5 transition-smooth ${
              inWishlist ? "fill-destructive text-destructive" : "text-foreground"
            }`}
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{genre}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-smooth">
          {title}
        </h3>
        
        <Button variant="hero" size="sm" className="w-full">
          <ShoppingCart className="h-4 w-4" />
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default GameCard;
