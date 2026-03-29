import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import SpinWheel, { SEGMENTS, type SpinWheelHandle } from "./SpinWheel";
import tigerLogo from "@/assets/tiger-logo.png";


export default function SlotMachine() {
  const { profile, updateCoins } = useProfile();
  const { signOut } = useAuth();
  const [spinning, setSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(10000);
  const [result, setResult] = useState<string | null>(null);
  const [showPrize, setShowPrize] = useState(false);
  const [wonIphone, setWonIphone] = useState(false);
  const wheelRef = useRef<SpinWheelHandle>(null);

  const coins = profile?.coins ?? 0;

  const spin = useCallback(async () => {
    if (spinning || spinsLeft <= 0 || !wheelRef.current) return;

    setSpinning(true);
    setResult(null);
    setShowPrize(false);
    setWonIphone(false);

    const landedIndex = await wheelRef.current.spin();
    const segment = SEGMENTS[landedIndex];

    if (segment.type === "r1000") {
      setResult("🎉 Você ganhou R$ 1.000!");
      setWonIphone(true);
      setShowPrize(true);
      setSpinsLeft((s) => s - 1);
      await updateCoins(coins + 1000, true);
    } else if (segment.type === "r100") {
      setResult("💰 Você ganhou R$ 100!");
      setShowPrize(true);
      setSpinsLeft((s) => s - 1);
      await updateCoins(coins + 100, true);
    } else {
      setResult("😔 Não foi dessa vez...");
      setSpinsLeft((s) => s - 1);
      setShowPrize(true);
      await updateCoins(coins, false);
    }

    setSpinning(false);
  }, [spinning, spinsLeft, coins, updateCoins]);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-game-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
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

      {/* Logo + Title */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={tigerLogo}
          alt="Fortune Tiger"
          width={56}
          height={56}
          className="rounded-full border-2 border-primary/50"
        />
        <div>
          <h1 className="text-xl md:text-3xl font-display font-black text-gold-gradient tracking-wider leading-tight">
            FORTUNE TIGER
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-body">
            Gire a roleta da sorte
          </p>
        </div>
      </div>

      {/* Spins + Coins info */}
      <div className="flex gap-6 mb-4">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body block">Rodadas</span>
          <motion.span
            key={spinsLeft}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xl font-display font-bold text-foreground"
          >
            {spinsLeft}
          </motion.span>
        </div>
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-body block">Moedas</span>
          <span className="text-xl font-display font-bold text-primary">
            💰 {coins.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Wheel */}
      <div className="relative">
        <SpinWheel ref={wheelRef} size={300} />

        {/* Win overlay */}
        <AnimatePresence>
          {showPrize && wonIphone && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 10 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div
                className="px-4 py-3 rounded-2xl flex flex-col items-center"
                style={{
                  background: "rgba(0, 0, 0, 0.85)",
                  boxShadow: "0 0 60px rgba(255, 215, 0, 0.5), 0 0 120px rgba(255, 215, 0, 0.2)",
                  border: "2px solid #FFD700",
                }}
              >
                <img src={iphonePrize} alt="iPhone 17 Pro" width={80} height={80} className="mb-2" />
                <span className="text-primary font-display font-black text-lg">iPhone 17 Pro!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result text */}
      <AnimatePresence>
        {showPrize && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center font-display font-bold text-lg ${
              wonIphone ? "text-primary" : result.includes("+2") ? "text-green-400" : "text-muted-foreground"
            }`}
          >
            {result}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spin button */}
      <motion.button
        whileTap={!spinning && spinsLeft > 0 ? { scale: 0.95 } : {}}
        onClick={spin}
        disabled={spinning || spinsLeft <= 0}
        className="mt-5 w-64 py-3 rounded-xl font-display font-black text-lg tracking-wider transition-all disabled:opacity-40"
        style={{
          background: spinning
            ? "linear-gradient(135deg, #555, #333)"
            : spinsLeft <= 0
            ? "linear-gradient(135deg, #333, #222)"
            : "linear-gradient(135deg, #8B0000, #CC0000, #8B0000)",
          color: "#FFD700",
          border: "2px solid",
          borderColor: spinning || spinsLeft <= 0 ? "#444" : "#DAA520",
          boxShadow: spinning || spinsLeft <= 0
            ? "none"
            : "0 0 20px rgba(204, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          cursor: spinning || spinsLeft <= 0 ? "not-allowed" : "pointer",
          textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
        }}
      >
        {spinning ? "GIRANDO..." : spinsLeft <= 0 ? "SEM RODADAS" : "🎰 GIRAR ROLETA"}
      </motion.button>

      {spinsLeft <= 0 && !spinning && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-muted-foreground font-body text-center"
        >
          Suas rodadas acabaram! Volte depois para mais.
        </motion.p>
      )}

      {/* Stats */}
      <div className="mt-5 flex gap-8 text-center">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Total Giros</div>
          <div className="text-lg font-bold text-foreground font-display">{profile.total_spins}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">Prêmios</div>
          <div className="text-lg font-bold text-primary font-display">{profile.total_wins}</div>
        </div>
      </div>

      {/* Prize info */}
      <div
        className="mt-4 rounded-lg p-3 w-full max-w-xs"
        style={{
          background: "linear-gradient(180deg, rgba(26, 10, 10, 0.9), rgba(15, 5, 5, 0.95))",
          border: "1px solid rgba(218, 165, 32, 0.2)",
        }}
      >
        <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground text-center mb-2 font-body">
          Prêmios da Roleta
        </h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <img src={iphonePrize} alt="" width={20} height={20} />
            <span className="text-primary font-bold">iPhone 17 Pro</span>
            <span className="text-muted-foreground text-xs ml-auto">4 chances</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🍀</span>
            <span className="text-green-400 font-bold">+2 Rodadas</span>
            <span className="text-muted-foreground text-xs ml-auto">2 chances</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>❌</span>
            <span className="text-muted-foreground">Perdeu</span>
            <span className="text-muted-foreground text-xs ml-auto">2 chances</span>
          </div>
        </div>
      </div>
    </div>
  );
}
