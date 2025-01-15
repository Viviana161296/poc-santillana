/*
  # AI Generation Enhancements

  1. New Tables
    - `ai_prompts` - Stores customizable AI prompts for different content types
    - `generation_logs` - Tracks AI content generation attempts and results

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create ai_prompts table for customizable prompts
CREATE TABLE IF NOT EXISTS ai_prompts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  prompt_text TEXT NOT NULL,
  default_parameters JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create generation_logs table for tracking
CREATE TABLE IF NOT EXISTS generation_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  prompt_id INTEGER REFERENCES ai_prompts(id),
  input_parameters JSONB NOT NULL,
  generated_content TEXT,
  status VARCHAR(50) NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_logs ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Anyone can read active prompts"
  ON ai_prompts
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can view their generation logs"
  ON generation_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create generation logs"
  ON generation_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create function to generate content with logging
CREATE OR REPLACE FUNCTION generate_content_with_logging(
  p_prompt_id INTEGER,
  p_parameters JSONB
) RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id INTEGER;
  v_content TEXT;
BEGIN
  -- Create initial log entry
  INSERT INTO generation_logs (
    user_id,
    prompt_id,
    input_parameters,
    status
  ) VALUES (
    auth.uid(),
    p_prompt_id,
    p_parameters,
    'processing'
  ) RETURNING id INTO v_log_id;

  BEGIN
    -- Generate content (placeholder for actual AI integration)
    v_content := 'Generated content based on parameters: ' || p_parameters::TEXT;
    
    -- Update log with success
    UPDATE generation_logs
    SET status = 'completed',
        generated_content = v_content
    WHERE id = v_log_id;
    
    RETURN v_content;
  EXCEPTION WHEN OTHERS THEN
    -- Update log with error
    UPDATE generation_logs
    SET status = 'failed',
        error_message = SQLERRM
    WHERE id = v_log_id;
    
    RAISE;
  END;
END;
$$;