import { useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  MessageCircle,
  Heart,
  Star,
  Crown,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import avatarImg from "@/assets/avatar-profile.png";

const LINKS = [
  { label: "Instagram", icon: Instagram, url: "#", color: "from-pink-500 to-purple-500" },
  { label: "Twitter / X", icon: Twitter, url: "#", color: "from-blue-400 to-cyan-400" },
  { label: "Telegram", icon: MessageCircle, url: "#", color: "from-sky-400 to-blue-500" },
];

const PLANS = [
  {
    name: "Básico",
    price: "R$ 19,90",
    period: "/mês",
    icon: Heart,
    features: ["Acesso ao conteúdo exclusivo", "Mensagens diretas", "Grupo VIP"],
    color: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/30",
    popular: false,
  },
  {
    name: "Premium",
    price: "R$ 49,90",
    period: "/mês",
    icon: Crown,
    features: ["Tudo do Básico", "Conteúdo premium", "Chamadas de vídeo", "Prioridade nas respostas"],
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    popular: true,
  },
  {
    name: "VIP",
    price: "R$ 99,90",
    period: "/mês",
    icon: Sparkles,
    features: ["Tudo do Premium", "Conteúdo personalizado", "Acesso vitalício ao grupo", "Surpresas mensais"],
    color: "from-violet-500/20 to-fuchsia-500/20",
    border: "border-violet-500/30",
    popular: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Index() {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("exemplo@pix.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center gap-6">
        {/* Avatar + Info */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 p-[3px]">
              <img
                src={avatarImg}
                alt="Avatar"
                width={112}
                height={112}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-500 border-[3px] border-background" />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground tracking-tight font-['Space_Grotesk']">
              Luna Privé
            </h1>
            <p className="text-muted-foreground text-sm">@lunaprive</p>
          </div>

          <p className="text-center text-sm text-muted-foreground max-w-[280px] leading-relaxed">
            ✨ Conteúdo exclusivo para assinantes ✨
            <br />
            Seu espaço de conexão e carinho 💜
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" /> 4.9
            </span>
            <span>•</span>
            <span>2.4k assinantes</span>
            <span>•</span>
            <span>328 posts</span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="w-full flex flex-col gap-2.5"
          initial="hidden"
          animate="visible"
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              custom={i}
              variants={fadeUp}
              className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group`}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center`}>
                <link.icon className="w-4.5 h-4.5 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground flex-1">{link.label}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Plans */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            custom={0}
            variants={fadeUp}
            className="text-base font-semibold text-foreground font-['Space_Grotesk'] text-center"
          >
            Escolha seu plano
          </motion.h2>

          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i + 1}
              variants={fadeUp}
              className={`relative w-full rounded-xl bg-gradient-to-br ${plan.color} border ${plan.border} p-4 flex flex-col gap-3`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-[10px] font-bold uppercase tracking-wider text-background">
                  Popular
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <plan.icon className="w-5 h-5 text-foreground" />
                  <span className="font-semibold text-foreground">{plan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-1.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className="w-full py-2.5 rounded-lg bg-foreground/10 hover:bg-foreground/15 text-sm font-medium text-foreground transition-colors backdrop-blur-sm">
                Assinar agora
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* PIX */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <button
            onClick={handleCopyPix}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all text-sm text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" /> Chave copiada!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copiar chave PIX
              </>
            )}
          </button>
        </motion.div>

        {/* Footer */}
        <p className="text-[10px] text-muted-foreground/50 text-center pb-4">
          © 2026 Luna Privé · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
