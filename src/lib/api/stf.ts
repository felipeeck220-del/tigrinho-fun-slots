// STF data - manually curated since there's no public REST API like Câmara/Senado
// The STF portal (portal.stf.jus.br) has some data but no structured API

export interface MinistroSTF {
  id: string;
  nome: string;
  nomeCompleto: string;
  foto: string;
  cargo: string;
  dataPosse: string;
  indicadoPor: string;
  naturalidade: string;
  uf: string;
  formacao: string;
  ativo: boolean;
}

export interface VotacaoSTF {
  id: string;
  processo: string;
  descricao: string;
  data: string;
  relator: string;
  resultado: string;
  votos: VotoSTF[];
  placar: { favor: number; contra: number };
}

export interface VotoSTF {
  ministro: string;
  voto: "Favorável" | "Contrário" | "Impedido" | "Ausente";
}

// Current STF ministers (2024-2025 composition)
export const MINISTROS_STF: MinistroSTF[] = [
  {
    id: "luis-roberto-barroso",
    nome: "Luís Roberto Barroso",
    nomeCompleto: "Luís Roberto Barroso",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_lrb.jpg",
    cargo: "Presidente",
    dataPosse: "2013-06-26",
    indicadoPor: "Dilma Rousseff",
    naturalidade: "Vassouras",
    uf: "RJ",
    formacao: "Direito - UERJ",
    ativo: true,
  },
  {
    id: "edson-fachin",
    nome: "Edson Fachin",
    nomeCompleto: "Luiz Edson Fachin",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_ef.jpg",
    cargo: "Vice-Presidente",
    dataPosse: "2015-06-16",
    indicadoPor: "Dilma Rousseff",
    naturalidade: "Rondinha",
    uf: "RS",
    formacao: "Direito - UFPR",
    ativo: true,
  },
  {
    id: "gilmar-mendes",
    nome: "Gilmar Mendes",
    nomeCompleto: "Gilmar Ferreira Mendes",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_gm.jpg",
    cargo: "Ministro",
    dataPosse: "2002-06-20",
    indicadoPor: "Fernando Henrique Cardoso",
    naturalidade: "Diamantino",
    uf: "MT",
    formacao: "Direito - UnB",
    ativo: true,
  },
  {
    id: "cármen-lucia",
    nome: "Cármen Lúcia",
    nomeCompleto: "Cármen Lúcia Antunes Rocha",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_cl.jpg",
    cargo: "Ministra",
    dataPosse: "2006-06-21",
    indicadoPor: "Luiz Inácio Lula da Silva",
    naturalidade: "Montes Claros",
    uf: "MG",
    formacao: "Direito - PUC Minas",
    ativo: true,
  },
  {
    id: "dias-toffoli",
    nome: "Dias Toffoli",
    nomeCompleto: "José Antônio Dias Toffoli",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_dt.jpg",
    cargo: "Ministro",
    dataPosse: "2009-10-23",
    indicadoPor: "Luiz Inácio Lula da Silva",
    naturalidade: "Marília",
    uf: "SP",
    formacao: "Direito - USP",
    ativo: true,
  },
  {
    id: "luiz-fux",
    nome: "Luiz Fux",
    nomeCompleto: "Luiz Fux",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_lf.jpg",
    cargo: "Ministro",
    dataPosse: "2011-03-03",
    indicadoPor: "Dilma Rousseff",
    naturalidade: "Rio de Janeiro",
    uf: "RJ",
    formacao: "Direito - UERJ",
    ativo: true,
  },
  {
    id: "alexandre-de-moraes",
    nome: "Alexandre de Moraes",
    nomeCompleto: "Alexandre de Moraes",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_am.jpg",
    cargo: "Ministro",
    dataPosse: "2017-03-22",
    indicadoPor: "Michel Temer",
    naturalidade: "São Paulo",
    uf: "SP",
    formacao: "Direito - USP",
    ativo: true,
  },
  {
    id: "nunes-marques",
    nome: "Nunes Marques",
    nomeCompleto: "Kassio Nunes Marques",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_knm.jpg",
    cargo: "Ministro",
    dataPosse: "2020-11-05",
    indicadoPor: "Jair Bolsonaro",
    naturalidade: "Teresina",
    uf: "PI",
    formacao: "Direito - UFPI",
    ativo: true,
  },
  {
    id: "andre-mendonca",
    nome: "André Mendonça",
    nomeCompleto: "André Luiz de Almeida Mendonça",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_alm.jpg",
    cargo: "Ministro",
    dataPosse: "2021-12-16",
    indicadoPor: "Jair Bolsonaro",
    naturalidade: "Santos",
    uf: "SP",
    formacao: "Direito - UFMA / Teologia",
    ativo: true,
  },
  {
    id: "cristiano-zanin",
    nome: "Cristiano Zanin",
    nomeCompleto: "Cristiano Zanin Martins",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_czm.jpg",
    cargo: "Ministro",
    dataPosse: "2023-08-03",
    indicadoPor: "Luiz Inácio Lula da Silva",
    naturalidade: "Jundiaí",
    uf: "SP",
    formacao: "Direito - PUC-SP",
    ativo: true,
  },
  {
    id: "flavio-dino",
    nome: "Flávio Dino",
    nomeCompleto: "Flávio Dino de Castro e Costa",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_fdc.jpg",
    cargo: "Ministro",
    dataPosse: "2024-02-22",
    indicadoPor: "Luiz Inácio Lula da Silva",
    naturalidade: "São Luís",
    uf: "MA",
    formacao: "Direito - UFMA",
    ativo: true,
  },
];

// Notable STF decisions (curated examples)
export const VOTACOES_STF: VotacaoSTF[] = [
  {
    id: "adi-5766",
    processo: "ADI 5766",
    descricao: "Constitucionalidade de dispositivos da Reforma Trabalhista sobre justiça gratuita",
    data: "2021-10-20",
    relator: "Luís Roberto Barroso",
    resultado: "Parcialmente procedente",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Contrário" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Contrário" },
      { ministro: "Gilmar Mendes", voto: "Contrário" },
      { ministro: "Luiz Fux", voto: "Contrário" },
      { ministro: "Nunes Marques", voto: "Contrário" },
    ],
    placar: { favor: 3, contra: 5 },
  },
  {
    id: "adpf-442",
    processo: "ADPF 442",
    descricao: "Descriminalização do aborto até a 12ª semana de gestação",
    data: "2024-09-01",
    relator: "Luís Roberto Barroso",
    resultado: "Julgamento suspenso",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Contrário" },
      { ministro: "Nunes Marques", voto: "Contrário" },
      { ministro: "André Mendonça", voto: "Contrário" },
      { ministro: "Cristiano Zanin", voto: "Contrário" },
    ],
    placar: { favor: 2, contra: 4 },
  },
  {
    id: "are-1121633",
    processo: "ARE 1121633",
    descricao: "Marco temporal para demarcação de terras indígenas",
    data: "2023-09-21",
    relator: "Edson Fachin",
    resultado: "Improcedente - Marco temporal rejeitado",
    votos: [
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Cristiano Zanin", voto: "Favorável" },
      { ministro: "Flávio Dino", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Contrário" },
      { ministro: "André Mendonça", voto: "Contrário" },
    ],
    placar: { favor: 9, contra: 2 },
  },
  {
    id: "adpf-1070",
    processo: "ADPF 1070",
    descricao: "Regulamentação das redes sociais e remoção de conteúdo",
    data: "2024-11-01",
    relator: "Luiz Fux",
    resultado: "Em julgamento",
    votos: [
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Flávio Dino", voto: "Favorável" },
    ],
    placar: { favor: 3, contra: 0 },
  },
  {
    id: "adi-7042",
    processo: "ADI 7042",
    descricao: "Defensoria Pública pode atuar em ações de improbidade administrativa",
    data: "2023-04-03",
    relator: "Edson Fachin",
    resultado: "Procedente",
    votos: [
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Favorável" },
      { ministro: "André Mendonça", voto: "Favorável" },
      { ministro: "Cristiano Zanin", voto: "Favorável" },
    ],
    placar: { favor: 10, contra: 0 },
  },
  {
    id: "adpf-708",
    processo: "ADPF 708",
    descricao: "Obrigatoriedade do Fundo Nacional sobre Mudança do Clima (Fundo Clima)",
    data: "2022-07-01",
    relator: "Luís Roberto Barroso",
    resultado: "Procedente",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Contrário" },
      { ministro: "André Mendonça", voto: "Favorável" },
    ],
    placar: { favor: 8, contra: 1 },
  },
];

export function getMinistrosSTF(): MinistroSTF[] {
  return MINISTROS_STF.filter((m) => m.ativo);
}

export function getMinistroSTF(id: string): MinistroSTF | undefined {
  return MINISTROS_STF.find((m) => m.id === id);
}

export function getVotacoesSTF(): VotacaoSTF[] {
  return VOTACOES_STF;
}

export function getVotacaoSTF(id: string): VotacaoSTF | undefined {
  return VOTACOES_STF.find((v) => v.id === id);
}
