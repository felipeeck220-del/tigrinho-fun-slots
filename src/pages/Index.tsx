import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Vote, ArrowRight, TrendingUp, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import PoliticianCard from "@/components/PoliticianCard";
import { getDeputados, type Deputado } from "@/lib/api/camara";
import { getSenadores, type Senador } from "@/lib/api/senado";
import { getMinistrosSTF } from "@/lib/api/stf";

export default function Index() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [senadores, setSenadores] = useState<Senador[]>([]);
  const [loading, setLoading] = useState(true);
  const ministros = getMinistrosSTF();

  useEffect(() => {
    Promise.all([
      getDeputados({ itens: 6 }).catch(() => []),
      getSenadores().catch(() => []),
    ]).then(([deps, sens]) => {
      setDeputados(deps);
      setSenadores(sens.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <TrendingUp className="w-4 h-4" />
          Dados em tempo real das APIs do governo
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Fiscalize seus
          <span className="text-primary"> representantes</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Acompanhe votações, veja como cada político votou e tenha acesso fácil
          às informações que estão nos sites do governo — sem complicação.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/deputados">
              <Users className="w-4 h-4 mr-2" />
              Deputados
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/senadores">
              <Users className="w-4 h-4 mr-2" />
              Senadores
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/stf">
              <Scale className="w-4 h-4 mr-2" />
              STF
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/votacoes">
              <Vote className="w-4 h-4 mr-2" />
              Votações
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-display font-bold">513</p>
            <p className="text-sm text-muted-foreground">Deputados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-display font-bold">81</p>
            <p className="text-sm text-muted-foreground">Senadores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Scale className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-display font-bold">11</p>
            <p className="text-sm text-muted-foreground">Ministros STF</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Vote className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-display font-bold">3</p>
            <p className="text-sm text-muted-foreground">Poderes</p>
          </CardContent>
        </Card>
      </section>

      {/* STF Ministers */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Ministros do STF</h2>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/stf/votacoes" className="gap-1">
                Votações STF <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/stf" className="gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ministros.slice(0, 4).map((m) => (
            <Link key={m.id} to={`/stf/${m.id}`}>
              <Card className="hover:shadow-md transition-all hover:border-primary/30 cursor-pointer group">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <Avatar className="w-16 h-16 border-2 border-muted">
                    <AvatarImage src={m.foto} alt={m.nome} />
                    <AvatarFallback className="text-sm font-bold">
                      {m.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-display font-semibold text-sm group-hover:text-primary transition-colors">
                    {m.nome}
                  </p>
                  <Badge
                    variant={m.cargo === "Presidente" ? "default" : "outline"}
                    className="text-[10px]"
                  >
                    {m.cargo}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Deputies */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Deputados Federais</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/deputados" className="gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 h-20" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deputados.map((d) => (
              <PoliticianCard
                key={d.id}
                id={d.id}
                nome={d.nome}
                partido={d.siglaPartido}
                uf={d.siglaUf}
                foto={d.urlFoto}
                tipo="deputado"
              />
            ))}
          </div>
        )}
      </section>

      {/* Senators */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Senadores</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/senadores" className="gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 h-20" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {senadores.map((s) => (
              <PoliticianCard
                key={s.IdentificacaoParlamentar.CodigoParlamentar}
                id={s.IdentificacaoParlamentar.CodigoParlamentar}
                nome={s.IdentificacaoParlamentar.NomeParlamentar}
                partido={s.IdentificacaoParlamentar.SiglaPartidoParlamentar}
                uf={s.IdentificacaoParlamentar.UfParlamentar}
                foto={s.IdentificacaoParlamentar.UrlFotoParlamentar}
                tipo="senador"
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
