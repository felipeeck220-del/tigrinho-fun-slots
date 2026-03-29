import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PoliticianCard from "@/components/PoliticianCard";
import { getDeputados, type Deputado } from "@/lib/api/camara";

const UFS = ["","AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];

export default function Deputados() {
  const [deputados, setDeputados] = useState<Deputado[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [uf, setUf] = useState("");
  const [pagina, setPagina] = useState(1);

  const fetchData = async (p = 1) => {
    setLoading(true);
    try {
      const data = await getDeputados({ nome: nome || undefined, siglaUf: uf || undefined, pagina: p, itens: 21 });
      setDeputados(data);
    } catch {
      setDeputados([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(pagina);
  }, [pagina]);

  const handleSearch = () => {
    setPagina(1);
    fetchData(1);
  };

  return (
    <Layout>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">
        Deputados Federais
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-9"
          />
        </div>
        <select
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todos os estados</option>
          {UFS.filter(Boolean).map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : deputados.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Nenhum deputado encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {deputados.map((d) => (
            <PoliticianCard
              key={d.id}
              id={d.id}
              nome={d.nome}
              partido={d.siglaPartido}
              uf={d.siglaUf}
              foto={d.urlFoto}
              tipo="deputado"
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <Button variant="outline" size="sm" disabled={pagina <= 1} onClick={() => setPagina(p => p - 1)}>
          Anterior
        </Button>
        <span className="flex items-center px-3 text-sm text-muted-foreground">
          Página {pagina}
        </span>
        <Button variant="outline" size="sm" disabled={deputados.length < 21} onClick={() => setPagina(p => p + 1)}>
          Próxima
        </Button>
      </div>
    </Layout>
  );
}
