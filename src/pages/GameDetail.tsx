import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Game {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image_url: string;
  rating: number;
  genre: string;
  categories?: { name: string };
}

interface GameMedia {
  id: string;
  media_type: 'image' | 'video';
  media_url: string;
  display_order: number;
}

const GameDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [gameMedia, setGameMedia] = useState<GameMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    loadGame();
  }, [slug]);

  const loadGame = async () => {
    const { data, error } = await supabase
      .from("games")
      .select("*, categories(name)")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      toast.error("Game tidak ditemukan");
      navigate("/");
      return;
    }

    setGame(data);
    loadGameMedia(data.id);
    setLoading(false);
  };

  const loadGameMedia = async (gameId: string) => {
    const { data } = await supabase
      .from('game_media')
      .select('*')
      .eq('game_id', gameId)
      .order('display_order');
    if (data) setGameMedia(data as GameMedia[]);
  };

  const handleWishlistClick = () => {
    if (!game) return;
    
    if (isInWishlist(game.id)) {
      removeFromWishlist(game.id);
      toast.success("Dihapus dari wishlist");
    } else {
      addToWishlist({
        id: game.id,
        title: game.title,
        price: game.price,
        image: game.image_url,
        rating: game.rating,
        genre: game.genre,
      });
      toast.success("Ditambahkan ke wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!game) return null;

  const inWishlist = isInWishlist(game.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden shadow-glow">
            <img
              src={game.image_url}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 gradient-text">{game.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="text-lg font-semibold">{game.rating}</span>
                </div>
                <span className="text-muted-foreground">{game.genre}</span>
                {game.categories && (
                  <span className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                    {game.categories.name}
                  </span>
                )}
              </div>
            </div>

            <div className="text-3xl font-bold text-primary">{game.price}</div>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {game.description || "Tidak ada deskripsi tersedia untuk game ini."}
              </p>
            </div>

            {gameMedia.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Galeri Game:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {gameMedia.map((media) => (
                    <div key={media.id} className="aspect-video rounded-lg overflow-hidden shadow-lg">
                      {media.media_type === 'image' ? (
                        <img 
                          src={media.media_url} 
                          alt="Screenshot game" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <video 
                          src={media.media_url} 
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="hero" size="lg" className="flex-1">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Beli Sekarang
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistClick}
                className="px-6"
              >
                <Heart
                  className={`h-5 w-5 ${
                    inWishlist ? "fill-destructive text-destructive" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-xl font-bold">Fitur Game:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Single Player & Multiplayer</li>
                <li>✓ Graphics Ultra HD</li>
                <li>✓ Full Controller Support</li>
                <li>✓ Cloud Saves</li>
                <li>✓ Achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetail;