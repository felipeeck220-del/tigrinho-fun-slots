import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import { getSenador } from "@/lib/api/senado";

export default function SenadorDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [senador, setSenador] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getSenador(id)
      .then(setSenador)
      .catch(() => setSenador(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-40 bg-muted rounded-lg" />
        </div>
      </Layout>
    );
  }

  if (!senador) {
    return (
      <Layout>
        <p className="text-center text-muted-foreground py-12">Senador não encontrado.</p>
      </Layout>
    );
  }

  const info = senador.IdentificacaoParlamentar || {};
  const dadosBasicos = senador.DadosBasicosParlamentar || {};

  return (
    <Layout>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/senadores">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="w-32 h-32 border-4 border-muted shrink-0">
              <AvatarImage src={info.UrlFotoParlamentar} alt={info.NomeParlamentar} />
              <AvatarFallback className="text-2xl font-bold">
                {(info.NomeParlamentar || "??").split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold">
                {info.NomeCompletoParlamentar || info.NomeParlamentar}
              </h1>
              <p className="text-muted-foreground text-sm mb-3">
                {info.FormaTratamento} {info.NomeParlamentar}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{info.SiglaPartidoParlamentar}</Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {info.UfParlamentar}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {info.EmailParlamentar && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${info.EmailParlamentar}`} className="text-primary hover:underline truncate">
                      {info.EmailParlamentar}
                    </a>
                  </div>
                )}
                {info.UrlPaginaParlamentar && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ExternalLink className="w-4 h-4" />
                    <a href={info.UrlPaginaParlamentar} target="_blank" rel="noopener" className="text-primary hover:underline truncate">
                      Página oficial
                    </a>
                  </div>
                )}
              </div>

              {dadosBasicos.DataNascimento && (
                <p className="text-xs text-muted-foreground mt-3">
                  Nascimento: {dadosBasicos.DataNascimento}
                  {dadosBasicos.Naturalidade && ` • ${dadosBasicos.Naturalidade} - ${dadosBasicos.UfNaturalidade}`}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
