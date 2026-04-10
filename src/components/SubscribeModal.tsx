import { useState, useEffect, useCallback } from "react";
import { X, Copy, Check, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "pix" | "success";

export default function SubscribeModal({ open, onClose }: SubscribeModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixCode, setPixCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);

  const reset = useCallback(() => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    setLoading(false);
    setError("");
    setPixCode("");
    setTransactionId("");
    setCopied(false);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  // Poll for payment status
  useEffect(() => {
    if (step !== "pix" || !transactionId) return;

    const interval = setInterval(async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("check-pix-status", {
          body: { transactionId },
        });
        if (!fnError && data?.status === "COMPLETED") {
          setStep("success");
          clearInterval(interval);
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, [step, transactionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Preencha todos os campos");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-pix-charge", {
        body: {
          amount: 990, // R$ 9,90
          customer: { name: name.trim(), email: email.trim(), phone: phone.trim() },
        },
      });

      if (fnError) throw new Error("Erro ao gerar PIX");
      if (data?.error) throw new Error(data.error);

      setPixCode(data.pixCode);
      setTransactionId(data.transactionId);
      setStep("pix");
    } catch (err: any) {
      setError(err.message || "Erro ao gerar PIX. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyPix = async () => {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-card rounded-2xl w-full max-w-sm shadow-2xl border border-border overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              {step === "form" && "Assinar VIP"}
              {step === "pix" && "Pague via PIX"}
              {step === "success" && "Pagamento Confirmado!"}
            </h2>
            <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5">
            {step === "form" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Plan info */}
                <div className="bg-muted rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground">Pack VIP — 30 dias</p>
                  <p className="text-2xl font-extrabold text-foreground mt-1">
                    R$ 9,90
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    De <span className="line-through">R$ 49,90</span> • 80% OFF
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="tel"
                  placeholder="Seu celular (com DDD)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                {error && <p className="text-xs text-destructive text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando PIX...
                    </>
                  ) : (
                    "Gerar PIX"
                  )}
                </button>
              </form>
            )}

            {step === "pix" && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-xl">
                  <QRCodeSVG value={pixCode} size={200} />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Escaneie o QR Code ou copie o código PIX abaixo
                </p>

                <div className="w-full bg-muted rounded-xl p-3 flex items-center gap-2">
                  <p className="text-[10px] text-foreground break-all flex-1 font-mono leading-relaxed">
                    {pixCode.slice(0, 80)}...
                  </p>
                  <button
                    onClick={copyPix}
                    className="shrink-0 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Aguardando pagamento...
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-base font-bold text-foreground">Pagamento confirmado!</p>
                <p className="text-xs text-muted-foreground text-center">
                  Seu acesso VIP foi liberado. Verifique seu e-mail para mais detalhes.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-sm mt-2"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
