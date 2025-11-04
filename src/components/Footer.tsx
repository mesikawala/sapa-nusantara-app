import { Gamepad2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="gradient-hero border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                GameStore
              </span>
            </div>
            <p className="text-muted-foreground">
              Toko game digital terpercaya dengan koleksi game terlengkap dan harga terbaik.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Kategori</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Action</li>
              <li>Adventure</li>
              <li>RPG</li>
              <li>Horror</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@gamestore.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 GameStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
