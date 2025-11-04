import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, Zap, Shield, Headphones } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import godOfWar from "@/assets/god-of-war.jpg";
import residentEvil4 from "@/assets/resident-evil-4.jpg";
import cyberpunk from "@/assets/cyberpunk.jpg";
import eldenRing from "@/assets/elden-ring.jpg";
import theLastOfUs from "@/assets/the-last-of-us.jpg";
import spiderman from "@/assets/spiderman.jpg";
import rdr2 from "@/assets/rdr2.jpg";
import gta5 from "@/assets/gta5.jpg";
import minecraft from "@/assets/minecraft.jpg";
import cod from "@/assets/cod.jpg";
import assassinsCreed from "@/assets/assassins-creed.jpg";
import horizon from "@/assets/horizon.jpg";
import ghostOfTsushima from "@/assets/ghost-of-tsushima.jpg";
import finalFantasy from "@/assets/final-fantasy.jpg";
import darkSouls from "@/assets/dark-souls.jpg";
import sekiro from "@/assets/sekiro.jpg";
import monsterHunter from "@/assets/monster-hunter.jpg";
import doom from "@/assets/doom.jpg";
import halo from "@/assets/halo.jpg";
import witcher3 from "@/assets/witcher3.jpg";

const Index = () => {
  const games = [
    {
      id: "god-of-war",
      title: "God of War",
      price: "Rp 699.000",
      image: godOfWar,
      rating: 4.9,
      genre: "Action-Adventure"
    },
    {
      id: "resident-evil-4",
      title: "Resident Evil 4 Remake",
      price: "Rp 599.000",
      image: residentEvil4,
      rating: 4.8,
      genre: "Horror"
    },
    {
      id: "cyberpunk-2077",
      title: "Cyberpunk 2077",
      price: "Rp 549.000",
      image: cyberpunk,
      rating: 4.6,
      genre: "RPG"
    },
    {
      id: "elden-ring",
      title: "Elden Ring",
      price: "Rp 649.000",
      image: eldenRing,
      rating: 4.9,
      genre: "Action RPG"
    },
    {
      id: "the-last-of-us",
      title: "The Last of Us Part II",
      price: "Rp 599.000",
      image: theLastOfUs,
      rating: 4.7,
      genre: "Action-Adventure"
    },
    {
      id: "spiderman",
      title: "Spider-Man",
      price: "Rp 499.000",
      image: spiderman,
      rating: 4.8,
      genre: "Action"
    },
    {
      id: "rdr2",
      title: "Red Dead Redemption 2",
      price: "Rp 749.000",
      image: rdr2,
      rating: 4.9,
      genre: "Action-Adventure"
    },
    {
      id: "gta5",
      title: "Grand Theft Auto V",
      price: "Rp 449.000",
      image: gta5,
      rating: 4.8,
      genre: "Action"
    },
    {
      id: "minecraft",
      title: "Minecraft",
      price: "Rp 299.000",
      image: minecraft,
      rating: 4.7,
      genre: "Sandbox"
    },
    {
      id: "cod-mw",
      title: "Call of Duty: Modern Warfare",
      price: "Rp 599.000",
      image: cod,
      rating: 4.6,
      genre: "FPS"
    },
    {
      id: "assassins-creed",
      title: "Assassin's Creed Valhalla",
      price: "Rp 649.000",
      image: assassinsCreed,
      rating: 4.5,
      genre: "Action-Adventure"
    },
    {
      id: "horizon",
      title: "Horizon Zero Dawn",
      price: "Rp 499.000",
      image: horizon,
      rating: 4.8,
      genre: "Action RPG"
    },
    {
      id: "ghost-of-tsushima",
      title: "Ghost of Tsushima",
      price: "Rp 699.000",
      image: ghostOfTsushima,
      rating: 4.9,
      genre: "Action-Adventure"
    },
    {
      id: "final-fantasy",
      title: "Final Fantasy XVI",
      price: "Rp 799.000",
      image: finalFantasy,
      rating: 4.7,
      genre: "Action RPG"
    },
    {
      id: "dark-souls",
      title: "Dark Souls III",
      price: "Rp 399.000",
      image: darkSouls,
      rating: 4.8,
      genre: "Action RPG"
    },
    {
      id: "sekiro",
      title: "Sekiro: Shadows Die Twice",
      price: "Rp 549.000",
      image: sekiro,
      rating: 4.9,
      genre: "Action-Adventure"
    },
    {
      id: "monster-hunter",
      title: "Monster Hunter World",
      price: "Rp 449.000",
      image: monsterHunter,
      rating: 4.6,
      genre: "Action RPG"
    },
    {
      id: "doom",
      title: "Doom Eternal",
      price: "Rp 499.000",
      image: doom,
      rating: 4.8,
      genre: "FPS"
    },
    {
      id: "halo",
      title: "Halo Infinite",
      price: "Rp 599.000",
      image: halo,
      rating: 4.5,
      genre: "FPS"
    },
    {
      id: "witcher3",
      title: "The Witcher 3: Wild Hunt",
      price: "Rp 399.000",
      image: witcher3,
      rating: 4.9,
      genre: "Action RPG"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Dapatkan game Anda langsung setelah pembayaran"
    },
    {
      icon: Shield,
      title: "100% Original",
      description: "Semua game dijamin original dan legal"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Tim support kami siap membantu kapan saja"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Dunia Game Digital<br />di Ujung Jari Anda
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Koleksi game terlengkap dengan harga terbaik. Instant delivery, 100% original.
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button variant="hero" size="lg">
              <Play className="h-5 w-5" />
              Jelajahi Game
            </Button>
            <Button variant="gaming" size="lg">
              Promo Hari Ini
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="gradient-card p-8 rounded-lg text-center border border-border shadow-card transition-smooth hover:scale-105 hover:glow-primary"
            >
              <div className="inline-flex p-4 gradient-primary rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Game Populer
          </h2>
          <p className="text-xl text-muted-foreground">
            Koleksi game terbaik dan terpopuler tahun ini
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="gradient-hero rounded-2xl p-12 text-center border border-border shadow-card">
          <h2 className="text-4xl font-bold mb-4">
            Siap Memulai Petualangan Gaming Anda?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan diskon 20% untuk pembelian pertama Anda!
          </p>
          <Button variant="hero" size="lg">
            Daftar Sekarang
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
