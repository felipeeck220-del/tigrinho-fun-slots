import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import { getMinistrosSTF, type MinistroSTF } from "@/lib/api/stf";

export default function STFMinistros() {
  const ministros = getMinistrosSTF();

  return (
    <Layout>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
        Supremo Tribunal Federal
      </h1>
      <p className="text-muted-foreground mb-6">
        Os 11 ministros que compõem a mais alta corte do Brasil
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ministros.map((m) => (
          <Link key={m.id} to={`/stf/${m.id}`}>
            <Card className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group h-full">
              <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                <Avatar className="w-24 h-24 border-4 border-muted">
                  <AvatarImage src={m.foto} alt={m.nome} />
                  <AvatarFallback className="text-lg font-bold">
                    {m.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display font-semibold group-hover:text-primary transition-colors">
                    {m.nome}
                  </p>
                  <Badge
                    variant={m.cargo === "Presidente" ? "default" : m.cargo === "Vice-Presidente" ? "secondary" : "outline"}
                    className="mt-1 text-[10px]"
                  >
                    {m.cargo}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>Indicado por: {m.indicadoPor}</p>
                  <p>Posse: {new Date(m.dataPosse).toLocaleDateString("pt-BR")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
