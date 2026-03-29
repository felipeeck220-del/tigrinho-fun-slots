import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Users, Vote, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  { to: "/", label: "Início", icon: Building2 },
  { to: "/deputados", label: "Deputados", icon: Users },
  { to: "/senadores", label: "Senadores", icon: Users },
  { to: "/votacoes", label: "Votações", icon: Vote },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg leading-none">
                Fiscaliza
              </span>
              <span className="text-primary font-display font-bold text-lg">BR</span>
              <p className="text-[10px] text-muted-foreground leading-none">
                Transparência política para todos
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto" />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t bg-card p-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="container py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            Dados obtidos das APIs públicas da{" "}
            <a href="https://dadosabertos.camara.leg.br" target="_blank" rel="noopener" className="text-primary hover:underline">
              Câmara dos Deputados
            </a>{" "}
            e do{" "}
            <a href="https://legis.senado.leg.br/dadosabertos" target="_blank" rel="noopener" className="text-primary hover:underline">
              Senado Federal
            </a>
          </p>
          <p className="mt-1">FiscalizaBR — Facilitando a transparência política para a população 🇧🇷</p>
        </div>
      </footer>
    </div>
  );
}
