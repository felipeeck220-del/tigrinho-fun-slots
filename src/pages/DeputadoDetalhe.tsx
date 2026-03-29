import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, GraduationCap, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import { getDeputado, type DeputadoDetalhes } from "@/lib/api/camara";

export default function DeputadoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [dep, setDep] = useState<DeputadoDetalhes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getDeputado(Number(id))
      .then(setDep)
      .catch(() => setDep(null))
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

  if (!dep) {
    return (
      <Layout>
        <p className="text-center text-muted-foreground py-12">Deputado não encontrado.</p>
      </Layout>
    );
  }

  const s = dep.ultimoStatus;

  return (
    <Layout>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/deputados">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="w-32 h-32 border-4 border-muted shrink-0">
              <AvatarImage src={s.urlFoto} alt={s.nome} />
              <AvatarFallback className="text-2xl font-bold">
                {s.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold">{s.nome}</h1>
              <p className="text-muted-foreground text-sm mb-3">{dep.nomeCivil}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{s.siglaPartido}</Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {s.siglaUf}
                </Badge>
                <Badge variant="outline">{s.situacao}</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {s.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline truncate">
                      {s.email}
                    </a>
                  </div>
                )}
                {dep.escolaridade && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    {dep.escolaridade}
                  </div>
                )}
                {dep.municipioNascimento && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {dep.municipioNascimento} - {dep.ufNascimento}
                  </div>
                )}
                {s.gabinete && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    Gabinete: {s.gabinete.predio} - Sala {s.gabinete.sala}
                  </div>
                )}
              </div>

              {dep.dataNascimento && (
                <p className="text-xs text-muted-foreground mt-3">
                  Nascimento: {new Date(dep.dataNascimento).toLocaleDateString("pt-BR")}
                  {dep.sexo && ` • ${dep.sexo === "M" ? "Masculino" : "Feminino"}`}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
