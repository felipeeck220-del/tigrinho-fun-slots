import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PoliticianCardProps {
  id: string | number;
  nome: string;
  partido: string;
  uf: string;
  foto: string;
  tipo: "deputado" | "senador";
}

export default function PoliticianCard({ id, nome, partido, uf, foto, tipo }: PoliticianCardProps) {
  return (
    <Link to={`/${tipo === "deputado" ? "deputados" : "senadores"}/${id}`}>
      <Card className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group">
        <CardContent className="p-4 flex items-center gap-3">
          <Avatar className="w-14 h-14 border-2 border-muted">
            <AvatarImage src={foto} alt={nome} />
            <AvatarFallback className="text-sm font-bold">
              {nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm group-hover:text-primary transition-colors truncate">
              {nome}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {partido}
              </Badge>
              <span className="text-xs text-muted-foreground">{uf}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
