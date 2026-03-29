import { useAuth } from "@/hooks/useAuth";
import AuthPage from "@/components/AuthPage";
import SlotMachine from "@/components/SlotMachine";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-game-gradient flex items-center justify-center">
        <div className="text-primary text-2xl font-display animate-pulse">
          🐯 Carregando...
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return <SlotMachine />;
}
