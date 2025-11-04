import { Button } from "./ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface GameCardProps {
  title: string;
  price: string;
  image: string;
  rating: number;
  genre: string;
}

const GameCard = ({ title, price, image, rating, genre }: GameCardProps) => {
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
