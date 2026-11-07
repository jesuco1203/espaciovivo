-- Enable row level security on the affected tables.
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Ensure the expected policies are defined for product images.
DROP POLICY IF EXISTS allow_public_read ON public.product_images;
CREATE POLICY allow_public_read
  ON public.product_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS allow_authenticated_insert ON public.product_images;
CREATE POLICY allow_authenticated_insert
  ON public.product_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth.uid());

-- Ensure contacts policies allow authenticated users to work with the table.
DROP POLICY IF EXISTS allow_authenticated_read ON public.contacts;
CREATE POLICY allow_authenticated_read
  ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS allow_authenticated_write ON public.contacts;
CREATE POLICY allow_authenticated_write
  ON public.contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth.uid());
