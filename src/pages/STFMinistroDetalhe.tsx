import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, GraduationCap, Calendar, UserCheck, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import VoteBar from "@/components/VoteBar";
import { getMinistroSTF, getVotosDoMinistro } from "@/lib/api/stf";

export default function STFMinistroDetalhe() {
  const { id } = useParams<{ id: string }>();
  const ministro = id ? getMinistroSTF(id) : undefined;

  if (!ministro) {
    return (
      <Layout>
        <p className="text-center text-muted-foreground py-12">Ministro não encontrado.</p>
      </Layout>
    );
  }

  const stats = getVotosDoMinistro(ministro.nome);

  return (
    <Layout>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/stf">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </Link>
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="w-32 h-32 border-4 border-muted shrink-0">
              <AvatarImage src={ministro.foto} alt={ministro.nome} />
              <AvatarFallback className="text-2xl font-bold">
                {ministro.nome.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold">{ministro.nome}</h1>
              <p className="text-muted-foreground text-sm mb-3">{ministro.nomeCompleto}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant={ministro.cargo === "Presidente" ? "default" : ministro.cargo === "Vice-Presidente" ? "secondary" : "outline"}
                >
                  {ministro.cargo}
                </Badge>
                <Badge variant="outline">STF</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Posse: {new Date(ministro.dataPosse).toLocaleDateString("pt-BR")}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="w-4 h-4" />
                  Indicado por: {ministro.indicadoPor}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {ministro.naturalidade} - {ministro.uf}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  {ministro.formacao}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voting stats */}
      {stats.total > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Votações</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold text-vote-favor">{stats.favor}</p>
              <p className="text-xs text-muted-foreground">Favorável</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold text-vote-contra">{stats.contra}</p>
              <p className="text-xs text-muted-foreground">Contrário</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Votações deste ministro */}
      <h2 className="font-display text-xl font-bold mb-4">Votações com participação</h2>
      {stats.votacoes.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma votação registrada neste acervo.</p>
      ) : (
        <div className="space-y-3">
          {stats.votacoes.map((v) => {
            const votoDoMinistro = v.votos.find((vt) => vt.ministro === ministro.nome);
            return (
              <Link key={v.id} to="/stf/votacoes">
                <Card className="hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" className="text-[10px]">{v.processo}</Badge>
                          <Badge variant="secondary" className="text-[10px]">{v.tema}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(v.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{v.descricao}</p>
                      </div>
                      {votoDoMinistro && (
                        <Badge
                          variant="outline"
                          className={`shrink-0 text-xs ${
                            votoDoMinistro.voto === "Favorável" || votoDoMinistro.voto === "Acompanhou relator"
                              ? "text-vote-favor border-vote-favor"
                              : votoDoMinistro.voto === "Contrário" || votoDoMinistro.voto === "Divergiu do relator"
                              ? "text-vote-contra border-vote-contra"
                              : "text-vote-abstencao border-vote-abstencao"
                          }`}
                        >
                          {votoDoMinistro.voto}
                        </Badge>
                      )}
                    </div>
                    <VoteBar sim={v.placar.favor} nao={v.placar.contra} />
                    <p className="text-xs text-muted-foreground mt-2">
                      {v.resultado}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
