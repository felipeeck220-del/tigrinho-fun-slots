interface VoteBarProps {
  sim: number;
  nao: number;
  abstencao?: number;
  total?: number;
}

export default function VoteBar({ sim, nao, abstencao = 0 }: VoteBarProps) {
  const total = sim + nao + abstencao || 1;
  const pSim = (sim / total) * 100;
  const pNao = (nao / total) * 100;
  const pAbs = (abstencao / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
        {pSim > 0 && (
          <div
            className="bg-vote-favor transition-all"
            style={{ width: `${pSim}%` }}
          />
        )}
        {pNao > 0 && (
          <div
            className="bg-vote-contra transition-all"
            style={{ width: `${pNao}%` }}
          />
        )}
        {pAbs > 0 && (
          <div
            className="bg-vote-abstencao transition-all"
            style={{ width: `${pAbs}%` }}
          />
        )}
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-vote-favor" />
          Sim {sim}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-vote-contra" />
          Não {nao}
        </span>
        {abstencao > 0 && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-vote-abstencao" />
            Abstenção {abstencao}
          </span>
        )}
      </div>
    </div>
  );
}
