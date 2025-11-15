import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CreditCard, Shield, Check } from "lucide-react";
import { calculateDiscount } from "@/lib/priceUtils";
import { Badge } from "@/components/ui/badge";

interface Game {
  id: string;
  title: string;
  price: string;
  image_url: string;
}

const Payment = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (!session) {
        toast.error("Silakan login terlebih dahulu");
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (gameId) {
      loadGame();
    }
  }, [gameId]);

  const loadGame = async () => {
    if (!gameId) return;

    const { data, error } = await supabase
      .from("games")
      .select("id, title, price, image_url")
      .eq("id", gameId)
      .maybeSingle();

    if (error || !data) {
      toast.error("Game tidak ditemukan");
      navigate("/");
      return;
    }

    setGame(data);
    setLoading(false);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!game) return;

    if (paymentMethod === "credit_card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Harap lengkapi data kartu kredit");
        return;
      }
    }

    setProcessing(true);

    // Simulasi proses pembayaran
    setTimeout(() => {
      setProcessing(false);
      toast.success("Pembayaran berhasil! Game telah ditambahkan ke library Anda.");
      navigate("/");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!game) return null;

  const discountedPrices = isLoggedIn ? calculateDiscount(game.price, 20) : null;
  const finalPrice = discountedPrices ? discountedPrices.discounted : game.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 gradient-text">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={game.image_url}
                    alt={game.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{game.title}</h3>
                    <div className="mt-2 space-y-1">
                      {isLoggedIn && discountedPrices ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              🎉 Diskon Member 20%
                            </Badge>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm line-through text-muted-foreground">
                              {game.price}
                            </span>
                            <span className="text-xl font-bold text-primary">
                              {discountedPrices.discounted}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Hemat {discountedPrices.savings}
                          </p>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-primary">{game.price}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{game.price}</span>
                  </div>
                  {isLoggedIn && discountedPrices && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Diskon Member (20%)</span>
                      <span className="text-green-500">-{discountedPrices.savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">{finalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
                <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="bank_transfer"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={paymentMethod === "bank_transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="bank_transfer" className="font-normal cursor-pointer">
                        Transfer Bank
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="credit_card"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="credit_card" className="font-normal cursor-pointer">
                        Kartu Kredit / Debit
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="e_wallet"
                        name="paymentMethod"
                        value="e_wallet"
                        checked={paymentMethod === "e_wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="e_wallet" className="font-normal cursor-pointer">
                        E-Wallet (GoPay, OVO, Dana)
                      </Label>
                    </div>
                  </div>

                  {paymentMethod === "credit_card" && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Nomor Kartu</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          maxLength={16}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nama di Kartu</Label>
                        <Input
                          id="cardName"
                          placeholder="Nama Lengkap"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Tanggal Kedaluwarsa</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                              if (value.length >= 2) {
                                setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
                              } else {
                                setExpiryDate(value);
                              }
                            }}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bank_transfer" && (
                    <div className="border-t pt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Transfer ke rekening berikut:
                      </p>
                      <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bank:</span>
                          <span className="font-semibold">BCA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nomor Rekening:</span>
                          <span className="font-semibold">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Atas Nama:</span>
                          <span className="font-semibold">Game Store</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t">
                          <span>Total:</span>
                          <span className="text-primary">{finalPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "e_wallet" && (
                    <div className="border-t pt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Pilih e-wallet yang akan digunakan. QR code akan muncul setelah konfirmasi.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <Shield className="h-4 w-4" />
                    <span>Pembayaran aman dan terenkripsi</span>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? (
                      "Memproses..."
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Bayar {finalPrice}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;

