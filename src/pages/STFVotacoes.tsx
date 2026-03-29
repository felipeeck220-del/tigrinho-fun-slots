import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Scale, Filter, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import VoteBar from "@/components/VoteBar";
import { getVotacoesSTF, getVotacoesPorTema, STF_DATA_SOURCE, type VotacaoSTF } from "@/lib/api/stf";

export default function STFVotacoes() {
  const votacoes = getVotacoesSTF();
  const temas = getVotacoesPorTema();
  const temasKeys = Object.keys(temas);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [temaFiltro, setTemaFiltro] = useState<string>("");

  const filtered = temaFiltro
    ? votacoes.filter((v) => v.tema === temaFiltro)
    : votacoes;

  return (
    <Layout>
      <div className="flex items-center gap-2 mb-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/stf">← Ministros</Link>
        </Button>
      </div>

      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
        Votações do STF
      </h1>
      <p className="text-muted-foreground mb-4">
        Decisões notáveis do Supremo Tribunal Federal com votos individuais dos ministros
      </p>

      {/* Tema filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={temaFiltro === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setTemaFiltro("")}
        >
          Todos ({votacoes.length})
        </Button>
        {temasKeys.map((tema) => (
          <Button
            key={tema}
            variant={temaFiltro === tema ? "default" : "outline"}
            size="sm"
            onClick={() => setTemaFiltro(tema)}
          >
            {tema} ({temas[tema].length})
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <CardContent
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setExpanded(expanded === v.id ? null : v.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      <Scale className="w-3 h-3 mr-1" />
                      {v.processo}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {v.tema}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(v.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{v.descricao}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Relator: {v.relator}
                  </p>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    expanded === v.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              <div className="mt-3">
                <VoteBar sim={v.placar.favor} nao={v.placar.contra} />
              </div>

              <div className="mt-2">
                <Badge
                  variant={
                    v.resultado.toLowerCase().includes("procedente") ||
                    v.resultado.toLowerCase().includes("unanimidade")
                      ? "default"
                      : v.resultado.toLowerCase().includes("improcedente")
                      ? "destructive"
                      : "outline"
                  }
                  className="text-[10px]"
                >
                  {v.resultado}
                </Badge>
              </div>

              {/* Expanded votes */}
              {expanded === v.id && (
                <div className="mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Votos individuais ({v.votos.length} ministros)
                  </p>
                  <div className="space-y-1">
                    {v.votos.map((voto, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0"
                      >
                        <span className="font-medium">{voto.ministro}</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            voto.voto === "Favorável" || voto.voto === "Acompanhou relator"
                              ? "text-vote-favor border-vote-favor"
                              : voto.voto === "Contrário" || voto.voto === "Divergiu do relator"
                              ? "text-vote-contra border-vote-contra"
                              : "text-vote-abstencao border-vote-abstencao"
                          }`}
                        >
                          {voto.voto}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data source disclaimer */}
      <Card className="mt-8 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">{STF_DATA_SOURCE.description}</p>
              <ul className="list-disc ml-4 space-y-0.5">
                {STF_DATA_SOURCE.sources.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="mt-2 italic">{STF_DATA_SOURCE.disclaimer}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
