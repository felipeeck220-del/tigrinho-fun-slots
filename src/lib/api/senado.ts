const BASE = "https://legis.senado.leg.br/dadosabertos";

export interface Senador {
  IdentificacaoParlamentar: {
    CodigoParlamentar: string;
    NomeParlamentar: string;
    NomeCompletoParlamentar: string;
    SexoParlamentar: string;
    FormaTratamento: string;
    UrlFotoParlamentar: string;
    UrlPaginaParlamentar: string;
    EmailParlamentar: string;
    SiglaPartidoParlamentar: string;
    UfParlamentar: string;
  };
  Mandato?: {
    CodigoMandato: string;
    UfParlamentar: string;
    PrimeiraLegislaturaDoMandato: { NumeroLegislatura: string };
    SegundaLegislaturaDoMandato: { NumeroLegislatura: string };
    DescricaoParticipacao: string;
    Suplentes?: unknown;
  };
}

export interface VotacaoSenado {
  CodigoSessaoVotacao: string;
  SiglaMateria: string;
  NumeroMateria: string;
  AnoMateria: string;
  DescricaoVotacao: string;
  DataSessao: string;
  HoraInicio: string;
  Resultado: string;
  TotalVotosSim: string;
  TotalVotosNao: string;
  TotalVotosAbstencao: string;
}

export interface VotoSenador {
  CodigoParlamentar: string;
  NomeParlamentar: string;
  SiglaPartido: string;
  SiglaUf: string;
  Voto: string;
  UrlFotoParlamentar?: string;
}

async function fetchSenado(path: string): Promise<any> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Senado API error: ${res.status}`);
  return res.json();
}

export async function getSenadores(): Promise<Senador[]> {
  const data = await fetchSenado("/senador/lista/atual");
  const parlamentares = data?.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar;
  return Array.isArray(parlamentares) ? parlamentares : [];
}

export async function getSenador(codigo: string): Promise<any> {
  const data = await fetchSenado(`/senador/${codigo}`);
  return data?.DetalheParlamentar?.Parlamentar;
}

export async function getVotacoesSenado(ano?: number): Promise<VotacaoSenado[]> {
  const year = ano ?? new Date().getFullYear();
  try {
    const data = await fetchSenado(`/plenario/lista/votacao/${year}`);
    const votacoes = data?.ListaVotacoes?.Votacoes?.Votacao;
    return Array.isArray(votacoes) ? votacoes : votacoes ? [votacoes] : [];
  } catch {
    return [];
  }
}

export async function getVotosSenado(codigoSessao: string): Promise<VotoSenador[]> {
  try {
    const data = await fetchSenado(`/plenario/votacao/${codigoSessao}`);
    const votos = data?.VotacaoParlamentar?.Parlamentares?.Parlamentar;
    if (!votos) return [];
    const arr = Array.isArray(votos) ? votos : [votos];
    return arr.map((p: any) => ({
      CodigoParlamentar: p.IdentificacaoParlamentar?.CodigoParlamentar || "",
      NomeParlamentar: p.IdentificacaoParlamentar?.NomeParlamentar || "",
      SiglaPartido: p.IdentificacaoParlamentar?.SiglaPartidoParlamentar || "",
      SiglaUf: p.IdentificacaoParlamentar?.UfParlamentar || "",
      Voto: p.VotoParlamentar?.DescricaoVoto || p.Voto || "",
      UrlFotoParlamentar: p.IdentificacaoParlamentar?.UrlFotoParlamentar,
    }));
  } catch {
    return [];
  }
}
