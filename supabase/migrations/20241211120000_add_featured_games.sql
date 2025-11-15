-- Add is_featured and featured_order columns to games table
ALTER TABLE public.games
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER;

-- Create index for better performance when querying featured games
CREATE INDEX IF NOT EXISTS idx_games_is_featured ON public.games(is_featured, featured_order);

-- Add comment for documentation
COMMENT ON COLUMN public.games.is_featured IS 'Whether this game should appear in the banner carousel';
COMMENT ON COLUMN public.games.featured_order IS 'Display order in the banner carousel (lower numbers appear first)';

