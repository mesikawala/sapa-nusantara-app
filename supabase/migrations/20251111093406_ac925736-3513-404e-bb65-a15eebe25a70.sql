-- Create table for additional game media (images and videos)
CREATE TABLE public.game_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_media ENABLE ROW LEVEL SECURITY;

-- Create policies for game_media
CREATE POLICY "Game media are viewable by everyone" 
ON public.game_media 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert game media" 
ON public.game_media 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update game media" 
ON public.game_media 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete game media" 
ON public.game_media 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create index for better performance
CREATE INDEX idx_game_media_game_id ON public.game_media(game_id);
CREATE INDEX idx_game_media_display_order ON public.game_media(game_id, display_order);