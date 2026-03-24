-- Enable pg_net extension (required for HTTP calls from triggers)
create extension if not exists pg_net schema extensions;

-- Function that calls the waitlist-welcome Edge Function
create or replace function public.trigger_waitlist_welcome()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url    := 'https://flvbametyvxrzmxfaqjw.supabase.co/functions/v1/waitlist-welcome',
    body   := json_build_object('record', json_build_object('email', NEW.email))::jsonb,
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  return NEW;
end;
$$;

-- Trigger: fires after every new waitlist signup
drop trigger if exists on_waitlist_insert on public.waitlist;
create trigger on_waitlist_insert
  after insert on public.waitlist
  for each row execute function public.trigger_waitlist_welcome();
