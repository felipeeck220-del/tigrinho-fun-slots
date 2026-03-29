import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Volume2, VolumeX } from "lucide-react";
import CanvasReels, { type CanvasReelsHandle } from "./CanvasReels";
import tigerLogo from "@/assets/tiger-logo.png";

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

// Decorative LED lights
function LedStrip({ count, vertical }: { count: number; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-1.5 items-center justify-center`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            background: i % 3 === 0
              ? "radial-gradient(circle, #FFD700 30%, #8B6914 100%)"
              : i % 3 === 1
              ? "radial-gradient(circle, #FF4444 30%, #8B0000 100%)"
              : "radial-gradient(circle, #FFD700 30%, #8B6914 100%)",
            boxShadow: i % 2 === 0
              ? "0 0 4px #FFD700, 0 0 8px rgba(255, 215, 0, 0.3)"
              : "0 0 4px #FF4444, 0 0 8px rgba(255, 0, 0, 0.3)",
            animation: `glowPulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function SlotMachine() {
  const { profile, updateCoins } = useProfile();
  const { signOut } = useAuth();
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const reelsRef = useRef<CanvasReelsHandle | null>(null);

  const coins = profile?.coins ?? 0;

  const spin = useCallback(async () => {
    if (spinning || coins < bet || !reelsRef.current) return;

    setSpinning(true);
    setShowWin(false);
    setLastWin(0);

    const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    await reelsRef.current.spin(finalReels);

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
  }, [spinning, coins, bet, updateCoins]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-game-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: "#FFD700",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `glowPulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
            {profile.display_name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">
            {profile.display_name}
          </span>
        </div>
        <button
          onClick={signOut}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Tiger Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-2"
      >
        <img
          src={tigerLogo}
          alt="Fortune Tiger"
          width={100}
          height={100}
          className="rounded-full border-2 border-primary/50 shadow-gold"
        />
      </motion.div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-display font-black text-gold-gradient mb-4 tracking-wider">
        FORTUNE TIGER
      </h1>

      {/* Machine Frame */}
      <div className={`relative transition-all duration-500 ${showWin ? "shadow-win" : ""}`}>
        {/* Outer ornamental frame */}
        <div
          className="absolute -inset-3 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #8B6914 0%, #DAA520 15%, #FFD700 30%, #DAA520 50%, #8B6914 65%, #DAA520 80%, #FFD700 100%)",
            padding: 2,
          }}
        />
        <div
          className="absolute -inset-2.5 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #1a0808 0%, #2a1010 50%, #1a0808 100%)",
          }}
        />

        {/* LED strips */}
        <div className="absolute -top-2 left-4 right-4 z-10">
          <LedStrip count={24} />
        </div>
        <div className="absolute -bottom-2 left-4 right-4 z-10">
          <LedStrip count={24} />
        </div>
        <div className="absolute -left-2 top-4 bottom-4 z-10">
          <LedStrip count={16} vertical />
        </div>
        <div className="absolute -right-2 top-4 bottom-4 z-10">
          <LedStrip count={16} vertical />
        </div>

        {/* Machine body */}
        <div
          className="relative rounded-xl p-5"
          style={{
            background: "linear-gradient(180deg, #1a0a0a 0%, #2d1515 30%, #1a0a0a 100%)",
            border: "1px solid #3d2a1a",
          }}
        >
          {/* Coins display */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Saldo</span>
              <motion.span
                key={coins}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-lg font-display font-bold text-primary"
              >
                💰 {coins.toLocaleString()}
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Aposta</span>
              <span className="text-lg font-display font-bold text-foreground">
                {bet}
              </span>
            </div>
          </div>

          {/* Canvas Reels */}
          <div className="flex justify-center">
            <CanvasReels reelsRef={reelsRef} />
          </div>

          {/* Win display */}
          <AnimatePresence>
            {showWin && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none"
              >
                <div
                  className="px-6 py-3 rounded-xl font-display font-black text-2xl text-primary-foreground"
                  style={{
                    background: "linear-gradient(135deg, #B8860B, #FFD700, #DAA520)",
                    boxShadow: "0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.3)",
                  }}
                >
                  🎉 +{lastWin.toLocaleString()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bet selector */}
          <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            {[5, 10, 25, 50, 100].map((b) => (
              <button
                key={b}
                onClick={() => !spinning && setBet(b)}
                disabled={spinning}
                className="transition-all duration-200"
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  background: bet === b
                    ? "linear-gradient(135deg, #B8860B, #FFD700)"
                    : "rgba(255, 255, 255, 0.05)",
                  color: bet === b ? "#0a0506" : "rgba(255, 255, 255, 0.4)",
                  border: bet === b ? "1px solid #FFD700" : "1px solid rgba(255, 255, 255, 0.08)",
                  cursor: spinning ? "not-allowed" : "pointer",
                  opacity: spinning ? 0.5 : 1,
                }}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Spin button */}
          <motion.button
            whileTap={!spinning && coins >= bet ? { scale: 0.95 } : {}}
            onClick={spin}
            disabled={spinning || coins < bet}
            className="w-full py-3 rounded-lg font-display font-black text-lg tracking-wider transition-all disabled:opacity-40"
            style={{
              background: spinning
                ? "linear-gradient(135deg, #555, #333)"
                : "linear-gradient(135deg, #8B0000, #CC0000, #8B0000)",
              color: "#FFD700",
              border: "2px solid",
              borderColor: spinning ? "#555" : "#DAA520",
              boxShadow: spinning
                ? "none"
                : "0 0 20px rgba(204, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              cursor: spinning || coins < bet ? "not-allowed" : "pointer",
              textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          >
            {spinning ? "GIRANDO..." : coins < bet ? "SEM MOEDAS" : "🎰 GIRAR"}
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 flex gap-8 text-center">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Rodadas</div>
          <div className="text-lg font-bold text-foreground font-display">{profile.total_spins}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Vitórias</div>
          <div className="text-lg font-bold text-primary font-display">{profile.total_wins}</div>
        </div>
      </div>

      {/* Payout table */}
      <div
        className="mt-4 rounded-lg p-3 w-full max-w-xs"
        style={{
          background: "linear-gradient(180deg, rgba(26, 10, 10, 0.9), rgba(15, 5, 5, 0.95))",
          border: "1px solid rgba(218, 165, 32, 0.2)",
        }}
      >
        <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground text-center mb-2 font-body">
          Pagamentos
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
          {Object.entries(PAYOUTS).map(([combo, mult]) => (
            <div key={combo} className="flex items-center justify-between text-sm px-1 py-0.5">
              <span className="text-sm">{combo.match(/.{1,2}/gu)?.join(" ")}</span>
              <span className="text-primary font-bold font-display text-xs">x{mult}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
