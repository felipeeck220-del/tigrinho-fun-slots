import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { amount, customer } = await req.json();

    const pixUrl = Deno.env.get("DUTTYFY_PIX_URL_ENCRYPTED");
    if (!pixUrl) {
      throw new Error("PIX URL not configured");
    }

    // Strip non-digits from phone
    const phone = customer.phone.replace(/\D/g, "");

    // Call Dutfy API
    const response = await fetch(pixUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        customer: {
          name: customer.name,
          document: "00000000000", // placeholder since we collect email/phone
          phone,
          email: customer.email,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Dutfy error:", response.status, errorText);
      throw new Error(`Gateway error: ${response.status}`);
    }

    const data = await response.json();

    // Persist transaction to DB
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("pix_transactions").insert({
      transaction_id: data.transactionId,
      pix_code: data.pixCode,
      amount,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: phone,
      status: "PENDING",
    });

    return new Response(
      JSON.stringify({
        transactionId: data.transactionId,
        pixCode: data.pixCode,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
