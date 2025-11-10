-- Create storage bucket for game images
insert into storage.buckets (id, name, public)
values ('game-images', 'game-images', true);

-- Create policy for anyone to view game images
create policy "Anyone can view game images"
on storage.objects
for select
using (bucket_id = 'game-images');

-- Create policy for admins to upload game images
create policy "Admins can upload game images"
on storage.objects
for insert
with check (
  bucket_id = 'game-images' 
  and has_role(auth.uid(), 'admin'::app_role)
);

-- Create policy for admins to update game images
create policy "Admins can update game images"
on storage.objects
for update
using (
  bucket_id = 'game-images' 
  and has_role(auth.uid(), 'admin'::app_role)
);

-- Create policy for admins to delete game images
create policy "Admins can delete game images"
on storage.objects
for delete
using (
  bucket_id = 'game-images' 
  and has_role(auth.uid(), 'admin'::app_role)
);