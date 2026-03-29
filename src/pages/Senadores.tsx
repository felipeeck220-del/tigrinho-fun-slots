import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import PoliticianCard from "@/components/PoliticianCard";
import { getSenadores, type Senador } from "@/lib/api/senado";

export default function Senadores() {
  const [senadores, setSenadores] = useState<Senador[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getSenadores()
      .then(setSenadores)
      .catch(() => setSenadores([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = senadores.filter((s) => {
    const info = s.IdentificacaoParlamentar;
    const search = busca.toLowerCase();
    return (
      !busca ||
      info.NomeParlamentar.toLowerCase().includes(search) ||
      info.SiglaPartidoParlamentar.toLowerCase().includes(search) ||
      info.UfParlamentar.toLowerCase().includes(search)
    );
  });

  return (
    <Layout>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">Senadores</h1>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, partido ou estado..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Nenhum senador encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => {
            const info = s.IdentificacaoParlamentar;
            return (
              <PoliticianCard
                key={info.CodigoParlamentar}
                id={info.CodigoParlamentar}
                nome={info.NomeParlamentar}
                partido={info.SiglaPartidoParlamentar}
                uf={info.UfParlamentar}
                foto={info.UrlFotoParlamentar}
                tipo="senador"
              />
            );
          })}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-6">
        {filtered.length} senador(es) encontrado(s)
      </p>
    </Layout>
  );
}
