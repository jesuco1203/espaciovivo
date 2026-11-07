-- Harden trigger_set_timestamp against search_path hijacking by restricting lookups.
ALTER FUNCTION public.trigger_set_timestamp()
  SET search_path = pg_catalog, public;
