import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Edit } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Game {
  id: string;
  title: string;
  description: string | null;
  price: string;
  image_url: string;
  rating: number;
  genre: string;
  category_id: string | null;
  categories?: { name: string };
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [gameForm, setGameForm] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    rating: "4.5",
    genre: "",
    category_id: "",
  });
  const [editingGame, setEditingGame] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    checkAdmin();
    loadCategories();
    loadGames();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setIsAdmin(false);
        toast.error("Silakan login terlebih dahulu");
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Gagal memeriksa role:", error);
      }

      const hasAdmin = !!data;
      setIsAdmin(hasAdmin);

      if (!hasAdmin) {
        toast.error("Anda tidak memiliki akses admin");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (data) setCategories(data);
  };

  const loadGames = async () => {
    const { data } = await supabase
      .from("games")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });
    if (data) setGames(data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newCategory.toLowerCase().replace(/\s+/g, "-");
    
    const { error } = await supabase
      .from("categories")
      .insert({ name: newCategory, slug });

    if (error) {
      toast.error("Gagal menambah kategori");
    } else {
      toast.success("Kategori berhasil ditambahkan");
      setNewCategory("");
      loadCategories();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Gagal menghapus kategori");
    } else {
      toast.success("Kategori berhasil dihapus");
      loadCategories();
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('game-images')
        .upload(filePath, file);

      if (uploadError) {
        toast.error("Gagal upload gambar");
        return null;
      }

      const { data } = supabase.storage
        .from('game-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      toast.error("Terjadi kesalahan saat upload gambar");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = gameForm.image_url;
    
    // Upload image if a new file is selected
    if (selectedImage) {
      const uploadedUrl = await handleImageUpload(selectedImage);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const slug = gameForm.title.toLowerCase().replace(/\s+/g, "-");
    const gameData = {
      ...gameForm,
      image_url: imageUrl,
      slug,
      rating: parseFloat(gameForm.rating),
      category_id: gameForm.category_id || null,
    };

    if (editingGame) {
      const { error } = await supabase
        .from("games")
        .update(gameData)
        .eq("id", editingGame);

      if (error) {
        toast.error("Gagal mengupdate game");
      } else {
        toast.success("Game berhasil diupdate");
        resetGameForm();
        loadGames();
      }
    } else {
      const { error } = await supabase
        .from("games")
        .insert(gameData);

      if (error) {
        toast.error("Gagal menambah game");
      } else {
        toast.success("Game berhasil ditambahkan");
        resetGameForm();
        loadGames();
      }
    }
  };

  const handleEditGame = (game: Game) => {
    setGameForm({
      title: game.title,
      description: game.description || "",
      price: game.price,
      image_url: game.image_url,
      rating: game.rating.toString(),
      genre: game.genre,
      category_id: game.category_id || "",
    });
    setEditingGame(game.id);
  };

  const handleDeleteGame = async (id: string) => {
    const { error } = await supabase
      .from("games")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Gagal menghapus game");
    } else {
      toast.success("Game berhasil dihapus");
      loadGames();
    }
  };

  const resetGameForm = () => {
    setGameForm({
      title: "",
      description: "",
      price: "",
      image_url: "",
      rating: "4.5",
      genre: "",
      category_id: "",
    });
    setEditingGame(null);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">Loading...</main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Akses ditolak</h1>
            <p className="text-muted-foreground">Anda tidak memiliki akses ke halaman ini.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Admin Panel</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Category Management */}
          <Card>
            <CardHeader>
              <CardTitle>Kelola Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4 mb-4">
                <div>
                  <Label>Nama Kategori</Label>
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Action, RPG"
                    required
                  />
                </div>
                <Button type="submit" variant="hero">Tambah Kategori</Button>
              </form>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{cat.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Game Form */}
          <Card>
            <CardHeader>
              <CardTitle>{editingGame ? "Edit Game" : "Tambah Game"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGameSubmit} className="space-y-4">
                <div>
                  <Label>Judul Game</Label>
                  <Input
                    value={gameForm.title}
                    onChange={(e) => setGameForm({ ...gameForm, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={gameForm.description}
                    onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })}
                    rows={6}
                    placeholder="Masukkan deskripsi lengkap game..."
                  />
                </div>
                <div>
                  <Label>Harga</Label>
                  <Input
                    value={gameForm.price}
                    onChange={(e) => setGameForm({ ...gameForm, price: e.target.value })}
                    placeholder="Rp 299.000"
                    required
                  />
                </div>
                <div>
                  <Label>Upload Gambar Pamflet</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(file);
                        // Preview the image
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setGameForm({ ...gameForm, image_url: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    disabled={uploadingImage}
                  />
                  {gameForm.image_url && (
                    <div className="mt-2">
                      <img 
                        src={gameForm.image_url} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Rating (0-5)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={gameForm.rating}
                    onChange={(e) => setGameForm({ ...gameForm, rating: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Genre</Label>
                  <Input
                    value={gameForm.genre}
                    onChange={(e) => setGameForm({ ...gameForm, genre: e.target.value })}
                    placeholder="Action, RPG, FPS"
                    required
                  />
                </div>
                <div>
                  <Label>Kategori (opsional)</Label>
                  <Select
                    value={gameForm.category_id || undefined}
                    onValueChange={(value) => setGameForm({ ...gameForm, category_id: value || "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori atau kosongkan" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="hero" disabled={uploadingImage}>
                    {uploadingImage ? "Mengupload..." : editingGame ? "Update Game" : "Tambah Game"}
                  </Button>
                  {editingGame && (
                    <Button type="button" variant="outline" onClick={resetGameForm}>
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Games List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Game</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {games.map((game) => (
                <div key={game.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-bold">{game.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {game.genre} • {game.price} • Rating: {game.rating}
                      {game.categories && ` • ${game.categories.name}`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditGame(game)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteGame(game.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;