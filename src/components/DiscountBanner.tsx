import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BannerGame {
  id: string;
  title: string;
  slug: string;
  price: string;
  image_url: string;
  genre: string;
}

const DiscountBanner = () => {
  const [featuredGames, setFeaturedGames] = useState<BannerGame[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedGames();
  }, []);

  const loadFeaturedGames = async () => {
    try {
      const { data, error } = await supabase
        .from("games")
        .select("id, title, slug, price, image_url, genre")
        .eq("is_featured", true)
        .order("featured_order", { ascending: true, nullsFirst: false });

      if (error) {
        // Jika kolom belum ada, skip error dan return empty array
        if (error.code === '42703' || error.message?.includes('does not exist') || error.message?.includes('column')) {
          console.warn("Kolom is_featured atau featured_order belum ada. Pastikan sudah menjalankan migration SQL.");
          setFeaturedGames([]);
          return;
        }
        console.error("Error loading featured games:", error);
        return;
      }

      if (data && data.length > 0) {
        setFeaturedGames(data as BannerGame[]);
      } else {
        setFeaturedGames([]);
      }
    } catch (err) {
      console.error("Unexpected error loading featured games:", err);
      setFeaturedGames([]);
    }
  };

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });

  return (
    <section className="container mx-auto px-4 py-4">
      <Carousel
        plugins={[plugin]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {featuredGames.map((game) => (
            <CarouselItem key={game.id}>
              <div className="relative h-[120px] md:h-[160px] rounded-xl overflow-hidden cursor-pointer">
                <img 
                  src={game.image_url} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center p-3 md:p-6">
                  <Badge className="w-fit mb-1 bg-accent text-accent-foreground text-[10px] md:text-xs px-2 py-0.5">
                    DISKON SPESIAL 20%
                  </Badge>
                  <h2 className="text-base md:text-xl font-bold text-white mb-1 line-clamp-1">
                    {game.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 mb-1 hidden md:block">
                    {game.genre}
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm md:text-lg font-bold text-primary">
                      {game.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through hidden md:inline">
                      Rp {(parseInt(game.price.replace(/[^\d]/g, '')) * 1.25).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={() => navigate(`/game/${game.slug}`)}
                    className="w-fit text-xs md:text-sm h-7 md:h-8 px-2 md:px-3"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default DiscountBanner;
