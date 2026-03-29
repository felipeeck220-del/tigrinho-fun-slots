import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  coins: number;
  total_wins: number;
  total_spins: number;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateCoins = async (newCoins: number, won: boolean) => {
    if (!user || !profile) return;

    const updates: Record<string, unknown> = {
      coins: newCoins,
      total_spins: profile.total_spins + 1,
    };
    if (won) {
      updates.total_wins = profile.total_wins + 1;
    }

    const { data } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id)
      .select()
      .single();

    if (data) setProfile(data);
  };

  return { profile, loading, updateCoins, refetchProfile: fetchProfile };
}
