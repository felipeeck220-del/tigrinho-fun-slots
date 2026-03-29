import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Vote, ChevronRight, Building2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import VoteBar from "@/components/VoteBar";
import { getVotacoes, getVotacaoVotos, type Votacao, type VotoDeputado } from "@/lib/api/camara";
import { getVotacoesSenado, type VotacaoSenado } from "@/lib/api/senado";

export default function Votacoes() {
  const [votacoesCamara, setVotacoesCamara] = useState<Votacao[]>([]);
  const [votacoesSenado, setVotacoesSenado] = useState<VotacaoSenado[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCamara, setExpandedCamara] = useState<string | null>(null);
  const [votosCamara, setVotosCamara] = useState<Record<string, VotoDeputado[]>>({});
  const [loadingVotos, setLoadingVotos] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      getVotacoes({ itens: 20 }).catch(() => []),
      getVotacoesSenado().catch(() => []),
    ]).then(([cam, sen]) => {
      setVotacoesCamara(cam);
      setVotacoesSenado(sen.slice(0, 20));
      setLoading(false);
    });
  }, []);

  const handleExpandCamara = async (id: string) => {
    if (expandedCamara === id) {
      setExpandedCamara(null);
      return;
    }
    setExpandedCamara(id);
    if (!votosCamara[id]) {
      setLoadingVotos(id);
      try {
        const votos = await getVotacaoVotos(id);
        setVotosCamara((prev) => ({ ...prev, [id]: votos }));
      } catch {
        setVotosCamara((prev) => ({ ...prev, [id]: [] }));
      }
      setLoadingVotos(null);
    }
  };

  const countVotos = (votos: VotoDeputado[]) => {
    let sim = 0, nao = 0, abstencao = 0;
    votos.forEach((v) => {
      const voto = v.tipoVoto?.toLowerCase();
      if (voto === "sim") sim++;
      else if (voto === "não" || voto === "nao") nao++;
      else abstencao++;
    });
    return { sim, nao, abstencao };
  };

  return (
    <Layout>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Votações</h1>

      <Tabs defaultValue="camara">
        <TabsList className="mb-4">
          <TabsTrigger value="camara" className="gap-1.5">
            <Building2 className="w-4 h-4" />
            Câmara
          </TabsTrigger>
          <TabsTrigger value="senado" className="gap-1.5">
            <Users className="w-4 h-4" />
            Senado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="camara">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : votacoesCamara.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhuma votação encontrada.</p>
          ) : (
            <div className="space-y-3">
              {votacoesCamara.map((v) => (
                <Card key={v.id} className="overflow-hidden">
                  <CardContent
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleExpandCamara(v.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            {v.siglaOrgao}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(v.data || v.dataHoraRegistro).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm font-medium line-clamp-2">{v.descricao || "Sem descrição"}</p>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                          expandedCamara === v.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {/* Expanded votes */}
                    {expandedCamara === v.id && (
                      <div className="mt-4 pt-4 border-t" onClick={(e) => e.stopPropagation()}>
                        {loadingVotos === v.id ? (
                          <p className="text-sm text-muted-foreground animate-pulse">Carregando votos...</p>
                        ) : votosCamara[v.id]?.length ? (
                          <>
                            <VoteBar {...countVotos(votosCamara[v.id])} />
                            <div className="mt-3 max-h-60 overflow-y-auto space-y-1">
                              {votosCamara[v.id].map((voto, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-0">
                                  <div className="flex items-center gap-2">
                                    <Link
                                      to={`/deputados/${voto.deputado_?.id}`}
                                      className="font-medium text-primary hover:underline"
                                    >
                                      {voto.deputado_?.nome}
                                    </Link>
                                    <span className="text-muted-foreground">
                                      {voto.deputado_?.siglaPartido}-{voto.deputado_?.siglaUf}
                                    </span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`text-[10px] ${
                                      voto.tipoVoto?.toLowerCase() === "sim"
                                        ? "text-vote-favor border-vote-favor"
                                        : voto.tipoVoto?.toLowerCase() === "não" || voto.tipoVoto?.toLowerCase() === "nao"
                                        ? "text-vote-contra border-vote-contra"
                                        : "text-vote-abstencao border-vote-abstencao"
                                    }`}
                                  >
                                    {voto.tipoVoto}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">Votos não disponíveis.</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="senado">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : votacoesSenado.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhuma votação do Senado encontrada para este ano.</p>
          ) : (
            <div className="space-y-3">
              {votacoesSenado.map((v, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px]">
                        {v.SiglaMateria} {v.NumeroMateria}/{v.AnoMateria}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{v.DataSessao}</span>
                    </div>
                    <p className="text-sm font-medium mb-2 line-clamp-2">
                      {v.DescricaoVotacao || "Sem descrição"}
                    </p>
                    <VoteBar
                      sim={parseInt(v.TotalVotosSim) || 0}
                      nao={parseInt(v.TotalVotosNao) || 0}
                      abstencao={parseInt(v.TotalVotosAbstencao) || 0}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <Badge
                        variant={v.Resultado?.toLowerCase().includes("aprovad") ? "default" : "destructive"}
                        className="text-[10px]"
                      >
                        {v.Resultado}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
