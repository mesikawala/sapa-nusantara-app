import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

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
    // For now, use mock featured games - can be replaced with actual discount games from DB
    const mockFeaturedGames: BannerGame[] = [
      {
        id: "1",
        title: "God of War Ragnarök",
        slug: "god-of-war-ragnarok",
        price: "Rp 699.000",
        image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop",
        genre: "Action-Adventure"
      },
      {
        id: "2",
        title: "Elden Ring",
        slug: "elden-ring",
        price: "Rp 649.000",
        image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=400&fit=crop",
        genre: "Action RPG"
      },
      {
        id: "3",
        title: "Cyberpunk 2077",
        slug: "cyberpunk-2077",
        price: "Rp 549.000",
        image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop",
        genre: "RPG"
      }
    ];
    setFeaturedGames(mockFeaturedGames);
  }, []);

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });

  return (
    <section className="container mx-auto px-4 py-8">
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
              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer">
                <img 
                  src={game.image_url} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                  <Badge className="w-fit mb-4 bg-accent text-accent-foreground text-sm md:text-base px-4 py-1">
                    DISKON SPESIAL 20%
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                    {game.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 mb-2">
                    {game.genre}
                  </p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {game.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      Rp {(parseInt(game.price.replace(/[^\d]/g, '')) * 1.25).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => navigate(`/game/${game.slug}`)}
                    className="w-fit"
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
