import { useWishlist } from "@/contexts/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 gradient-primary rounded-full mb-4">
            <Heart className="h-12 w-12 text-background fill-background" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Wishlist Saya
          </h1>
          <p className="text-xl text-muted-foreground">
            {wishlistCount > 0 
              ? `Anda memiliki ${wishlistCount} game di wishlist` 
              : "Wishlist Anda masih kosong"}
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        ) : (
          <div className="gradient-card rounded-2xl p-16 text-center border border-border shadow-card">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">Wishlist Kosong</h3>
            <p className="text-muted-foreground mb-6">
              Mulai tambahkan game favorit Anda ke wishlist dengan klik ikon hati pada setiap game
            </p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center gradient-primary text-background font-bold px-8 py-3 rounded-md transition-smooth hover:scale-105 glow-primary"
            >
              Jelajahi Game
            </a>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
