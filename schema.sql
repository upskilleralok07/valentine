-- Create the confessions table
create table public.confessions (
  id text primary key,
  sender_name text not null,
  recipient_name text not null,
  message text not null,
  music_choice text default 'lofi',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table public.confessions enable row level security;

-- Create a policy that allows anyone to insert a new confession
create policy "Enable insert for everyone" on public.confessions for insert with check (true);

-- Create a policy that allows anyone to read a confession (if they have the ID)
create policy "Enable read for everyone" on public.confessions for select using (true);
