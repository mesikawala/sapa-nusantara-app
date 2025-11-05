import { Link, useNavigate, useLocation } from "react-router-dom";
import { Gamepad2, Heart, LogOut, Shield } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkAdmin(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout berhasil");
    navigate("/");
  };

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

            {isAdmin && (
              <Link 
                to="/admin"
                className={`transition-smooth hover:text-primary ${
                  isActive("/admin") ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                <Shield className="h-6 w-6" />
              </Link>
            )}

            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;