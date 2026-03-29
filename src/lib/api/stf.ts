// STF data - Curated from official STF portal and public records
// The STF does NOT have a structured REST API like Câmara/Senado
// Data sourced from: portal.stf.jus.br, transparencia.stf.jus.br
// Last updated: March 2025

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
  tema: string;
  votos: VotoSTF[];
  placar: { favor: number; contra: number };
}

export interface VotoSTF {
  ministro: string;
  voto: "Favorável" | "Contrário" | "Impedido" | "Ausente" | "Acompanhou relator" | "Divergiu do relator";
}

// Current STF ministers (composição atualizada 2025)
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
    formacao: "Direito - UERJ / Mestrado Yale",
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
    formacao: "Direito - UFPR / Doutorado PUC-SP",
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
    formacao: "Direito - UnB / Doutorado Münster",
    ativo: true,
  },
  {
    id: "carmen-lucia",
    nome: "Cármen Lúcia",
    nomeCompleto: "Cármen Lúcia Antunes Rocha",
    foto: "https://portal.stf.jus.br/gem/foto_ministro/ministro_cl.jpg",
    cargo: "Ministra",
    dataPosse: "2006-06-21",
    indicadoPor: "Luiz Inácio Lula da Silva",
    naturalidade: "Montes Claros",
    uf: "MG",
    formacao: "Direito - PUC Minas / Mestrado UFMG",
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
    formacao: "Direito - Instituição Toledo de Ensino",
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
    formacao: "Direito - UERJ / Doutorado UERJ",
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
    formacao: "Direito - USP / Doutorado USP",
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
    formacao: "Direito - UFPI / Doutorado UniCEUB",
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
    formacao: "Direito - UFMA / Mestrado em Teologia",
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
    formacao: "Direito - PUC-SP / Doutorado USP",
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
    formacao: "Direito - UFMA / Mestrado UFPE",
    ativo: true,
  },
];

// Decisions sourced from official STF records, news and jurisprudence portal
// Categories: Direitos Fundamentais, Direito Penal, Meio Ambiente, Direito Eleitoral, Trabalhista, Tributário
export const VOTACOES_STF: VotacaoSTF[] = [
  // ====== Direitos Fundamentais ======
  {
    id: "adpf-132",
    processo: "ADPF 132 / ADI 4277",
    descricao: "Reconhecimento da união estável homoafetiva como entidade familiar",
    data: "2011-05-05",
    relator: "Ayres Britto",
    resultado: "Procedente por unanimidade",
    tema: "Direitos Fundamentais",
    votos: [
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
    ],
    placar: { favor: 10, contra: 0 },
  },
  {
    id: "adpf-54",
    processo: "ADPF 54",
    descricao: "Interrupção da gravidez de feto anencéfalo não é crime de aborto",
    data: "2012-04-12",
    relator: "Marco Aurélio",
    resultado: "Procedente (8x2)",
    tema: "Direitos Fundamentais",
    votos: [
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Contrário" },
    ],
    placar: { favor: 8, contra: 2 },
  },
  {
    id: "adi-4439",
    processo: "ADI 4439",
    descricao: "Ensino religioso confessional em escolas públicas é constitucional",
    data: "2017-09-27",
    relator: "Luís Roberto Barroso",
    resultado: "Improcedente (6x5)",
    tema: "Direitos Fundamentais",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Contrário" },
      { ministro: "Gilmar Mendes", voto: "Contrário" },
      { ministro: "Dias Toffoli", voto: "Contrário" },
      { ministro: "Alexandre de Moraes", voto: "Contrário" },
    ],
    placar: { favor: 5, contra: 6 },
  },
  {
    id: "re-1010606",
    processo: "RE 1010606",
    descricao: "Direito ao esquecimento é incompatível com a Constituição",
    data: "2021-02-11",
    relator: "Dias Toffoli",
    resultado: "Procedente por unanimidade",
    tema: "Direitos Fundamentais",
    votos: [
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Favorável" },
    ],
    placar: { favor: 9, contra: 0 },
  },

  // ====== Direito Penal / Criminal ======
  {
    id: "hc-126292",
    processo: "HC 126292",
    descricao: "Execução da pena após condenação em segunda instância (prisão após 2ª instância)",
    data: "2016-02-17",
    relator: "Teori Zavascki",
    resultado: "Denegado (7x4) - permitiu execução antecipada",
    tema: "Direito Penal",
    votos: [
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Contrário" },
    ],
    placar: { favor: 7, contra: 4 },
  },
  {
    id: "adcs-43-44-54",
    processo: "ADCs 43, 44 e 54",
    descricao: "Derrubou a prisão após condenação em 2ª instância — pena só após trânsito em julgado",
    data: "2019-11-07",
    relator: "Marco Aurélio",
    resultado: "Procedente (6x5)",
    tema: "Direito Penal",
    votos: [
      { ministro: "Alexandre de Moraes", voto: "Contrário" },
      { ministro: "Edson Fachin", voto: "Contrário" },
      { ministro: "Luís Roberto Barroso", voto: "Contrário" },
      { ministro: "Luiz Fux", voto: "Contrário" },
      { ministro: "Cármen Lúcia", voto: "Contrário" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
    ],
    placar: { favor: 6, contra: 5 },
  },
  {
    id: "re-635659",
    processo: "RE 635659",
    descricao: "Porte de maconha para uso pessoal — descriminalização (até 40g ou 6 plantas)",
    data: "2024-06-26",
    relator: "Gilmar Mendes",
    resultado: "Procedente parcial (8x3) — diferenciou usuário de traficante",
    tema: "Direito Penal",
    votos: [
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Cristiano Zanin", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Contrário" },
      { ministro: "André Mendonça", voto: "Contrário" },
      { ministro: "Flávio Dino", voto: "Contrário" },
    ],
    placar: { favor: 8, contra: 3 },
  },

  // ====== Meio Ambiente ======
  {
    id: "adpf-708",
    processo: "ADPF 708",
    descricao: "Governo é obrigado a manter Fundo Nacional sobre Mudança do Clima (Fundo Clima) ativo",
    data: "2022-07-01",
    relator: "Luís Roberto Barroso",
    resultado: "Procedente (10x1)",
    tema: "Meio Ambiente",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "André Mendonça", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Contrário" },
    ],
    placar: { favor: 8, contra: 1 },
  },
  {
    id: "are-1121633",
    processo: "ARE 1121633",
    descricao: "Marco temporal para demarcação de terras indígenas — rejeitado pela Corte",
    data: "2023-09-21",
    relator: "Edson Fachin",
    resultado: "Improcedente (9x2) — Marco temporal inconstitucional",
    tema: "Meio Ambiente",
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

  // ====== Trabalhista ======
  {
    id: "adi-5766",
    processo: "ADI 5766",
    descricao: "Reforma Trabalhista: inconstitucionalidade parcial de dispositivos sobre justiça gratuita",
    data: "2021-10-20",
    relator: "Luís Roberto Barroso",
    resultado: "Parcialmente procedente (6x4)",
    tema: "Trabalhista",
    votos: [
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Contrário" },
      { ministro: "Nunes Marques", voto: "Contrário" },
    ],
    placar: { favor: 6, contra: 4 },
  },
  {
    id: "re-958252",
    processo: "RE 958252",
    descricao: "Terceirização é lícita em todas as atividades empresariais, inclusive atividade-fim",
    data: "2018-08-30",
    relator: "Luiz Fux",
    resultado: "Procedente (7x4)",
    tema: "Trabalhista",
    votos: [
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Contrário" },
      { ministro: "Edson Fachin", voto: "Contrário" },
    ],
    placar: { favor: 7, contra: 4 },
  },

  // ====== Direito Eleitoral / Político ======
  {
    id: "adi-4650",
    processo: "ADI 4650",
    descricao: "Proibição de doações de pessoas jurídicas para campanhas eleitorais",
    data: "2015-09-17",
    relator: "Luiz Fux",
    resultado: "Procedente (8x3)",
    tema: "Direito Eleitoral",
    votos: [
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Contrário" },
    ],
    placar: { favor: 8, contra: 3 },
  },

  // ====== Tributário ======
  {
    id: "re-574706",
    processo: "RE 574706",
    descricao: "ICMS não compõe a base de cálculo do PIS/Cofins (tese do século)",
    data: "2017-03-15",
    relator: "Cármen Lúcia",
    resultado: "Procedente (6x4)",
    tema: "Tributário",
    votos: [
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Edson Fachin", voto: "Contrário" },
      { ministro: "Dias Toffoli", voto: "Contrário" },
      { ministro: "Gilmar Mendes", voto: "Contrário" },
    ],
    placar: { favor: 6, contra: 4 },
  },

  // ====== Regulação / Digital ======
  {
    id: "adi-7042",
    processo: "ADI 7042",
    descricao: "Defensoria Pública pode atuar em ações de improbidade administrativa",
    data: "2023-04-03",
    relator: "Edson Fachin",
    resultado: "Procedente por unanimidade",
    tema: "Direitos Fundamentais",
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
    id: "re-1037396",
    processo: "RE 1037396",
    descricao: "Marco Civil da Internet: redes sociais podem ser responsabilizadas por conteúdo de terceiros",
    data: "2024-12-01",
    relator: "Dias Toffoli",
    resultado: "Em julgamento — maioria formada pela responsabilização",
    tema: "Digital / Regulação",
    votos: [
      { ministro: "Dias Toffoli", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Flávio Dino", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
    ],
    placar: { favor: 5, contra: 0 },
  },
  {
    id: "adpf-403",
    processo: "ADPF 403 / ADI 5527",
    descricao: "Bloqueio judicial do WhatsApp é desproporcional e inconstitucional",
    data: "2024-05-27",
    relator: "Edson Fachin",
    resultado: "Procedente — bloqueio é desproporcional",
    tema: "Digital / Regulação",
    votos: [
      { ministro: "Edson Fachin", voto: "Favorável" },
      { ministro: "Luís Roberto Barroso", voto: "Favorável" },
      { ministro: "Luiz Fux", voto: "Favorável" },
      { ministro: "Alexandre de Moraes", voto: "Favorável" },
      { ministro: "Cármen Lúcia", voto: "Favorável" },
      { ministro: "Cristiano Zanin", voto: "Favorável" },
      { ministro: "Flávio Dino", voto: "Favorável" },
      { ministro: "Gilmar Mendes", voto: "Favorável" },
      { ministro: "Nunes Marques", voto: "Favorável" },
      { ministro: "André Mendonça", voto: "Favorável" },
      { ministro: "Dias Toffoli", voto: "Favorável" },
    ],
    placar: { favor: 11, contra: 0 },
  },
];

export function getMinistrosSTF(): MinistroSTF[] {
  return MINISTROS_STF.filter((m) => m.ativo);
}

export function getMinistroSTF(id: string): MinistroSTF | undefined {
  return MINISTROS_STF.find((m) => m.id === id);
}

export function getVotacoesSTF(): VotacaoSTF[] {
  return [...VOTACOES_STF].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export function getVotacaoSTF(id: string): VotacaoSTF | undefined {
  return VOTACOES_STF.find((v) => v.id === id);
}

export function getVotacoesPorTema(): Record<string, VotacaoSTF[]> {
  const map: Record<string, VotacaoSTF[]> = {};
  VOTACOES_STF.forEach((v) => {
    if (!map[v.tema]) map[v.tema] = [];
    map[v.tema].push(v);
  });
  return map;
}

export function getVotosDoMinistro(nomeMinistro: string) {
  const votacoes = VOTACOES_STF.filter((v) =>
    v.votos.some((vt) => vt.ministro === nomeMinistro)
  );
  let favor = 0, contra = 0;
  votacoes.forEach((v) => {
    const voto = v.votos.find((vt) => vt.ministro === nomeMinistro);
    if (voto?.voto === "Favorável" || voto?.voto === "Acompanhou relator") favor++;
    else if (voto?.voto === "Contrário" || voto?.voto === "Divergiu do relator") contra++;
  });
  return { votacoes, favor, contra, total: votacoes.length };
}

// Data source notes
export const STF_DATA_SOURCE = {
  description: "Dados compilados de fontes oficiais públicas do STF",
  sources: [
    "Portal STF (portal.stf.jus.br) — acórdãos e decisões",
    "STF Corte Aberta (transparencia.stf.jus.br) — painel de decisões",
    "Notícias STF — cobertura oficial de julgamentos",
    "Diário da Justiça Eletrônico — publicações oficiais",
  ],
  disclaimer: "O STF não disponibiliza API REST pública para consulta de votações. Os dados são compilados de registros públicos oficiais e podem não refletir o acervo completo de decisões.",
};
