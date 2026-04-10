CREATE TABLE public.pix_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text NOT NULL,
  pix_code text NOT NULL,
  amount integer NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  created_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz
);

ALTER TABLE public.pix_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.pix_transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.pix_transactions FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.pix_transactions FOR UPDATE USING (true);