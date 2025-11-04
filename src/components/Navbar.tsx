import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useWishlist } from "@/contexts/WishlistContext";

const Navbar = () => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-hero border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:scale-105">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              GameStore
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`transition-smooth hover:text-primary ${
                isActive("/") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Beranda
            </Link>
            <Link 
              to="/contact" 
              className={`transition-smooth hover:text-primary ${
                isActive("/contact") ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              Kontak
            </Link>
            <Link 
              to="/wishlist" 
              className="relative transition-smooth hover:scale-110"
            >
              <Heart 
                className={`h-6 w-6 ${
                  isActive("/wishlist") ? "fill-destructive text-destructive" : "text-foreground hover:text-primary"
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Button variant="hero" size="sm">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
