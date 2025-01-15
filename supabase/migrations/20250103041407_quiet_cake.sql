/*
  # AI Content Generation Support

  1. New Tables
    - `ai_content_templates`
      - Stores predefined prompts for different content types
    - `generated_contents`
      - Stores generated content history
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create ai_content_templates table
CREATE TABLE IF NOT EXISTS ai_content_templates (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('exercise', 'explanation', 'quiz')),
  name VARCHAR(255) NOT NULL,
  prompt_template TEXT NOT NULL,
  parameters JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create generated_contents table
CREATE TABLE IF NOT EXISTS generated_contents (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('exercise', 'explanation', 'quiz')),
  skill_level VARCHAR(50) NOT NULL CHECK (skill_level IN ('basic', 'intermediate', 'advanced')),
  content TEXT NOT NULL,
  parameters JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE ai_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_contents ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Authenticated users can read templates"
  ON ai_content_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their generated content"
  ON generated_contents
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can create generated content"
  ON generated_contents
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Create stored procedure for content generation
CREATE OR REPLACE FUNCTION generate_content(
  p_topic TEXT,
  p_type TEXT,
  p_skill_level TEXT,
  p_parameters JSONB DEFAULT '{}'::jsonb
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_template TEXT;
  v_result JSONB;
BEGIN
  -- Get template
  SELECT prompt_template INTO v_template
  FROM ai_content_templates
  WHERE type = p_type
  LIMIT 1;

  -- Store generation request
  INSERT INTO generated_contents (
    topic,
    type,
    skill_level,
    content,
    parameters,
    created_by
  ) VALUES (
    p_topic,
    p_type,
    p_skill_level,
    'Content will be updated after generation',
    p_parameters,
    auth.uid()
  );

  -- Return template and parameters
  RETURN jsonb_build_object(
    'template', v_template,
    'parameters', p_parameters
  );
END;
$$;