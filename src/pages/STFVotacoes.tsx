import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import VoteBar from "@/components/VoteBar";
import { getVotacoesSTF, type VotacaoSTF } from "@/lib/api/stf";

export default function STFVotacoes() {
  const votacoes = getVotacoesSTF();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Layout>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
        Votações do STF
      </h1>
      <p className="text-muted-foreground mb-6">
        Decisões notáveis do Supremo Tribunal Federal
      </p>

      <div className="space-y-3">
        {votacoes.map((v) => (
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
                    <span className="text-xs text-muted-foreground">
                      {new Date(v.data).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Relator: {v.relator}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{v.descricao}</p>
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
                  variant={v.resultado.toLowerCase().includes("procedente") ? "default" : "outline"}
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
                            voto.voto === "Favorável"
                              ? "text-vote-favor border-vote-favor"
                              : voto.voto === "Contrário"
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
    </Layout>
  );
}
