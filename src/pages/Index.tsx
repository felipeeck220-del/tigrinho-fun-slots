import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Bookmark, Lock, MoreHorizontal, LogIn } from "lucide-react";
import avatarImg from "@/assets/avatar-profile.png";
import coverImg from "@/assets/cover-banner.png";
import blur1 from "@/assets/blur-content-1.jpg";
import blur2 from "@/assets/blur-content-2.jpg";
import blur3 from "@/assets/blur-content-3.jpg";

const POSTS = [
  { id: 1, image: blur1, likes: "5.4k", aspect: "aspect-square" },
  { id: 2, image: blur2, likes: "3.2k", aspect: "aspect-[4/5]" },
  { id: 3, image: blur3, likes: "7.1k", aspect: "aspect-square" },
];

function LockedOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-sm">
      <div className="bg-card/90 rounded-xl px-6 py-4 flex flex-col items-center gap-1.5 shadow-lg">
        <Lock className="w-5 h-5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
          Conteúdo Exclusivo
        </span>
        <span className="text-[10px] text-muted-foreground">Toque para liberar</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [selectedPlan, setSelectedPlan] = useState<string>("7dias");

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-extrabold text-foreground">
            Milena<span className="text-primary">Vip</span>
          </h1>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
        </header>

        {/* Cover / Profile Section */}
        <motion.div
          className="flex flex-col items-center pt-6 pb-4 px-4 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full border-[3px] border-primary p-[2px]">
            <img
              src={avatarImg}
              alt="Milena"
              width={80}
              height={80}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-bold text-foreground">Milena</span>
              <span className="text-primary text-sm">✓</span>
            </div>
            <p className="text-xs text-muted-foreground">@milenapadilha.oficial</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-foreground">183.7K</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
            <span>LIKES</span>
          </div>

          {/* Offers */}
          <p className="text-sm text-foreground mt-1">
            Ofertas exclusivas 🔥
          </p>
        </motion.div>

        {/* Plans Section */}
        <motion.div
          className="px-4 pb-4 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Main CTA with badge */}
          <div className="relative">
            <div className="absolute -top-2 right-3 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
              -10% OFF
            </div>
            <button
              onClick={() => setSelectedPlan("7dias")}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                selectedPlan === "7dias"
                  ? "bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-lg"
                  : "bg-gradient-to-r from-primary/80 to-primary/50 text-primary-foreground"
              }`}
            >
              Assinar agora (7 dias) R$ 19,90
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground text-center -mt-0.5">
            De <span className="line-through">R$ 22,90</span> por apenas R$ 19,90
          </p>

          {/* Plan options */}
          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={() => setSelectedPlan("mensal")}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all ${
                selectedPlan === "mensal"
                  ? "bg-gradient-to-r from-primary/40 to-primary/20 border border-primary/30"
                  : "bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/20"
              }`}
            >
              <span className="font-bold text-foreground">Mensal <span className="font-normal text-muted-foreground">(30 dias)</span></span>
              <span className="font-extrabold text-foreground text-base">R$ 29,90</span>
            </button>

            <button
              onClick={() => setSelectedPlan("semestral")}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all ${
                selectedPlan === "semestral"
                  ? "bg-gradient-to-r from-primary/40 to-primary/20 border border-primary/30"
                  : "bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/20"
              }`}
            >
              <span className="font-bold text-foreground">6 meses <span className="font-normal text-muted-foreground">(semestral)</span></span>
              <span className="font-extrabold text-foreground text-base">R$ 99,90</span>
            </button>
          </div>

          {/* Payment button - dark style with lock icon */}
          <button className="w-full py-4 mt-2 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Já fiz o pagamento
          </button>
          <p className="text-[10px] text-muted-foreground text-center -mt-0.5">
            Toque acima para criar sua conta
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-2 bg-muted" />

        {/* Feed - Locked posts */}
        <div className="flex flex-col">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, ease: "easeOut" as const }}
            >
              {/* Post header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <img
                  src={avatarImg}
                  alt="Milena"
                  loading="lazy"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">Milena</span>
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">@milenapadilha.oficial</p>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Post image with lock */}
              <div className={`relative w-full ${post.aspect} overflow-hidden`}>
                <img
                  src={post.image}
                  alt="Conteúdo exclusivo"
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover blur-lg scale-110"
                />
                <LockedOverlay />
              </div>

              {/* Post actions */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Likes */}
              <div className="px-4 pb-3 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
                <span className="text-xs font-semibold text-foreground">{post.likes} Likes</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "E muito mais..." */}
        <p className="text-center text-sm text-muted-foreground py-4">E muito mais...</p>

        {/* Bottom CTA */}
        <div className="px-4 pb-6">
          <button className="w-full py-4 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-opacity">
            Libere o VIP para ver tudo
            <br />
            <span className="text-[11px] font-normal opacity-70">Acesso imediato a mídias exclusivas</span>
          </button>
        </div>

        {/* FAQ */}
        <div className="px-4 pb-8">
          <h2 className="text-base font-bold text-foreground mb-3">Dúvidas Frequentes</h2>
          <div className="flex flex-col gap-2">
            {[
              { q: "Como funciona?", a: "Escolha seu plano, faça o pagamento e tenha acesso imediato a todo conteúdo exclusivo." },
              { q: "O pagamento é seguro?", a: "Sim! Utilizamos as melhores plataformas de pagamento do mercado." },
              { q: "Posso cancelar?", a: "Sim, você pode cancelar a qualquer momento sem taxas adicionais." },
            ].map((faq) => (
              <details key={faq.q} className="bg-card border border-border rounded-xl overflow-hidden">
                <summary className="px-4 py-3 text-sm font-medium text-foreground cursor-pointer">
                  {faq.q}
                </summary>
                <p className="px-4 pb-3 text-xs text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
