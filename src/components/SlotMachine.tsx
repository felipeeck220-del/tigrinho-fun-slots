import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SYMBOLS = ["🐯", "💰", "🐉", "🏮", "💎", "🍀", "7️⃣", "⭐"];

const PAYOUTS: Record<string, number> = {
  "🐯🐯🐯": 50,
  "💰💰💰": 30,
  "🐉🐉🐉": 25,
  "💎💎💎": 20,
  "7️⃣7️⃣7️⃣": 15,
  "🏮🏮🏮": 10,
  "⭐⭐⭐": 8,
  "🍀🍀🍀": 5,
};

function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function ReelColumn({ symbols, spinning }: { symbols: string[]; spinning: boolean }) {
  return (
    <div className="w-20 h-24 bg-reel-gradient rounded-md border border-border overflow-hidden relative">
      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={symbols.join("")}
            initial={spinning ? { y: -40, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="text-4xl leading-none select-none"
          >
            {symbols[0]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SlotMachine() {
  const { profile, updateCoins } = useProfile();
  const { signOut } = useAuth();
  const [reels, setReels] = useState<string[]>(["🐯", "💰", "🐉"]);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const spinIntervals = useRef<NodeJS.Timeout[]>([]);

  const coins = profile?.coins ?? 0;

  const spin = useCallback(async () => {
    if (spinning || coins < bet) return;

    setSpinning(true);
    setShowWin(false);
    setLastWin(0);

    // Rapid random symbols per reel
    const newReels = [...reels];
    spinIntervals.current = reels.map((_, i) =>
      setInterval(() => {
        newReels[i] = getRandomSymbol();
        setReels([...newReels]);
      }, 80 + i * 20)
    );

    // Stop reels one by one
    const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    for (let i = 0; i < 3; i++) {
      await new Promise((r) => setTimeout(r, 600 + i * 400));
      clearInterval(spinIntervals.current[i]);
      newReels[i] = finalReels[i];
      setReels([...newReels]);
    }

    // Check win
    const key = finalReels.join("");
    const payout = PAYOUTS[key];
    const won = !!payout;
    const winAmount = won ? bet * payout : 0;
    const newCoins = coins - bet + winAmount;

    if (won) {
      setLastWin(winAmount);
      setShowWin(true);
    }

    await updateCoins(newCoins, won);
    setSpinning(false);
  }, [spinning, coins, bet, reels, updateCoins]);

  // Cleanup
  useEffect(() => {
    return () => spinIntervals.current.forEach(clearInterval);
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-game-gradient flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {profile.display_name}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-display font-black text-gold-gradient mb-6">
        🐯 TIGRINHO
      </h1>

      {/* Machine */}
      <div className={`bg-card border-2 rounded-xl p-6 transition-all duration-300 ${showWin ? "border-primary shadow-win" : "border-border shadow-gold"}`}>
        {/* Coins Display */}
        <div className="text-center mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Saldo</span>
          <div className={`text-2xl font-bold text-primary font-display ${showWin ? "animate-coin-bounce" : ""}`}>
            💰 {coins.toLocaleString()}
          </div>
        </div>

        {/* Reels */}
        <div className="flex gap-2 mb-4 justify-center">
          {reels.map((sym, i) => (
            <ReelColumn key={i} symbols={[sym]} spinning={spinning} />
          ))}
        </div>

        {/* Win display */}
        <AnimatePresence>
          {showWin && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center mb-4"
            >
              <div className="text-xl font-display font-bold text-primary">
                🎉 +{lastWin.toLocaleString()} moedas!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bet controls */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-xs text-muted-foreground">Aposta:</span>
          {[5, 10, 25, 50, 100].map((b) => (
            <button
              key={b}
              onClick={() => !spinning && setBet(b)}
              className={`px-3 py-1 text-xs rounded-md font-medium transition-all
                ${bet === b
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }
                ${spinning ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Spin button */}
        <Button
          onClick={spin}
          disabled={spinning || coins < bet}
          className="w-full h-12 text-lg font-display font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 glow-pulse"
        >
          {spinning ? "GIRANDO..." : coins < bet ? "SEM MOEDAS" : "GIRAR 🎰"}
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-6 flex gap-6 text-center">
        <div>
          <div className="text-xs text-muted-foreground">Rodadas</div>
          <div className="text-lg font-bold text-foreground">{profile.total_spins}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Vitórias</div>
          <div className="text-lg font-bold text-primary">{profile.total_wins}</div>
        </div>
      </div>

      {/* Payout table */}
      <div className="mt-6 bg-card border border-border rounded-lg p-4 w-full max-w-xs">
        <h3 className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-2">
          Tabela de Pagamentos
        </h3>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {Object.entries(PAYOUTS).map(([combo, mult]) => (
            <div key={combo} className="flex items-center justify-between px-2 py-1">
              <span className="text-base">{combo.match(/.{1,2}/gu)?.join(" ")}</span>
              <span className="text-primary font-bold">x{mult}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
