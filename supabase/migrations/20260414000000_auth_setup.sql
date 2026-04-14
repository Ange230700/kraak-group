-- ============================================================
-- Migration : bootstrap Auth Supabase MVP
-- Objectif  : versionner la base Auth email/password et
--             provisionner automatiquement app_user depuis
--             auth.users pour le MVP KRAAK.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  metadata jsonb := COALESCE(new.raw_user_meta_data, '{}'::jsonb);
  role_text text := COALESCE(NULLIF(trim(metadata ->> 'role'), ''), 'participant');
  email_text text := COALESCE(NULLIF(trim(new.email), ''), new.id::text);
  first_name_text text := COALESCE(
    NULLIF(trim(metadata ->> 'first_name'), ''),
    split_part(email_text, '@', 1)
  );
  last_name_text text := COALESCE(
    NULLIF(trim(metadata ->> 'last_name'), ''),
    'Participant'
  );
BEGIN
  IF role_text NOT IN ('participant', 'admin', 'trainer') THEN
    role_text := 'participant';
  END IF;

  INSERT INTO public.app_user (
    id,
    email,
    role,
    first_name,
    last_name,
    phone,
    preferred_contact_channel
  )
  VALUES (
    new.id,
    email_text,
    role_text::public.user_role,
    first_name_text,
    last_name_text,
    NULLIF(trim(COALESCE(metadata ->> 'phone', '')), ''),
    NULLIF(trim(COALESCE(metadata ->> 'preferred_contact_channel', '')), '')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    updated_at = now();

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_auth_user_created();
