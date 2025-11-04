import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Hubungi Kami
            </h1>
            <p className="text-xl text-muted-foreground">
              Ada pertanyaan? Kami siap membantu Anda!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="gradient-card p-6 rounded-lg border border-border shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 gradient-primary rounded-lg">
                    <Mail className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">info@gamestore.com</p>
                    <p className="text-muted-foreground">support@gamestore.com</p>
                  </div>
                </div>
              </div>
              
              <div className="gradient-card p-6 rounded-lg border border-border shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 gradient-primary rounded-lg">
                    <Phone className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Telepon</h3>
                    <p className="text-muted-foreground">+62 812-3456-7890</p>
                    <p className="text-muted-foreground">Senin - Jumat, 09:00 - 18:00 WIB</p>
                  </div>
                </div>
              </div>
              
              <div className="gradient-card p-6 rounded-lg border border-border shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 gradient-primary rounded-lg">
                    <MapPin className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Alamat</h3>
                    <p className="text-muted-foreground">
                      Jl. Sudirman No. 123<br />
                      Jakarta Pusat 10220<br />
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gradient-card p-8 rounded-lg border border-border shadow-card">
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama</label>
                  <Input placeholder="Nama lengkap Anda" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subjek</label>
                  <Input placeholder="Perihal pesan Anda" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Pesan</label>
                  <Textarea placeholder="Tulis pesan Anda di sini..." rows={5} />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  <Send className="h-5 w-5" />
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
