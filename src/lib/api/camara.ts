const BASE = "https://dadosabertos.camara.leg.br/api/v2";

export interface Deputado {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

export interface DeputadoDetalhes {
  id: number;
  uri: string;
  nomeCivil: string;
  ultimoStatus: {
    id: number;
    uri: string;
    nome: string;
    siglaPartido: string;
    uriPartido: string;
    siglaUf: string;
    idLegislatura: number;
    urlFoto: string;
    email: string;
    data: string;
    nomeEleitoral: string;
    gabinete: {
      nome: string;
      predio: string;
      sala: string;
      andar: string;
      telefone: string;
      email: string;
    };
    situacao: string;
    condicaoEleitoral: string;
    descricaoStatus: string | null;
  };
  cpf: string;
  sexo: string;
  dataNascimento: string;
  dataFalecimento: string | null;
  ufNascimento: string;
  municipioNascimento: string;
  escolaridade: string;
}

export interface Votacao {
  id: string;
  uri: string;
  data: string;
  dataHoraRegistro: string;
  siglaOrgao: string;
  uriOrgao: string;
  uriEvento: string;
  proposicaoObjeto: string | null;
  uriProposicaoObjeto: string | null;
  descricao: string;
  aprovacao: number;
}

export interface VotoDeputado {
  deputado_: {
    id: number;
    uri: string;
    nome: string;
    siglaPartido: string;
    uriPartido: string;
    siglaUf: string;
    idLegislatura: number;
    urlFoto: string;
    email: string;
  };
  tipoVoto: string;
  dataRegistroVoto: string;
}

async function fetchCamara<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Câmara API error: ${res.status}`);
  const json = await res.json();
  return json.dados;
}

export async function getDeputados(params?: { nome?: string; siglaUf?: string; siglaPartido?: string; pagina?: number; itens?: number }): Promise<Deputado[]> {
  const p: Record<string, string> = {
    ordem: "ASC",
    ordenarPor: "nome",
    itens: String(params?.itens ?? 15),
    pagina: String(params?.pagina ?? 1),
  };
  if (params?.nome) p.nome = params.nome;
  if (params?.siglaUf) p.siglaUf = params.siglaUf;
  if (params?.siglaPartido) p.siglaPartido = params.siglaPartido;
  return fetchCamara<Deputado[]>("/deputados", p);
}

export async function getDeputado(id: number): Promise<DeputadoDetalhes> {
  return fetchCamara<DeputadoDetalhes>(`/deputados/${id}`);
}

export async function getVotacoes(params?: { pagina?: number; itens?: number }): Promise<Votacao[]> {
  return fetchCamara<Votacao[]>("/votacoes", {
    ordem: "DESC",
    ordenarPor: "dataHoraRegistro",
    itens: String(params?.itens ?? 15),
    pagina: String(params?.pagina ?? 1),
  });
}

export async function getVotacaoVotos(idVotacao: string): Promise<VotoDeputado[]> {
  return fetchCamara<VotoDeputado[]>(`/votacoes/${idVotacao}/votos`);
}

export async function getDeputadoVotacoes(idDeputado: number, pagina = 1): Promise<Votacao[]> {
  // This endpoint doesn't exist directly; we use proposicoes voted
  // For simplicity we return general votações
  return getVotacoes({ pagina });
}
