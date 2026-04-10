import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId } = await req.json();

    const pixUrl = Deno.env.get("DUTTYFY_PIX_URL_ENCRYPTED");
    if (!pixUrl) throw new Error("PIX URL not configured");

    const response = await fetch(`${pixUrl}/${transactionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Status check error: ${response.status}`);
    }

    const data = await response.json();

    // Update DB if completed
    if (data.status === "COMPLETED") {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase
        .from("pix_transactions")
        .update({ status: "COMPLETED", paid_at: data.paidAt || new Date().toISOString() })
        .eq("transaction_id", transactionId);
    }

    return new Response(
      JSON.stringify({ status: data.status }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
