/*
  # Micro-learning Content Schema

  1. New Tables
    - `micro_learnings`: Core content items
      - `id` (serial primary key)
      - `title` (varchar, required)
      - `type` (varchar, required)
      - `duration` (integer, optional)
      - `content_url` (text, optional)
      - `skill_level` (varchar, optional)
      - Timestamps for tracking

    - `content_mappings`: Relationships between content
      - `id` (serial primary key)
      - `micro_learning_id` (foreign key)
      - `content_id` (foreign key)
      - Creation timestamp
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create micro_learnings table
CREATE TABLE IF NOT EXISTS micro_learnings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('video', 'text', 'interactive', 'quiz')),
  duration INTEGER,
  content_url TEXT,
  skill_level VARCHAR(50) CHECK (skill_level IN ('basic', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create content_mappings table
CREATE TABLE IF NOT EXISTS content_mappings (
  id SERIAL PRIMARY KEY,
  micro_learning_id INTEGER NOT NULL REFERENCES micro_learnings(id),
  content_id INTEGER NOT NULL REFERENCES contents(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(micro_learning_id, content_id)
);

-- Create indexes
CREATE INDEX idx_microlearnings_type ON micro_learnings(type);
CREATE INDEX idx_microlearnings_skill_level ON micro_learnings(skill_level);
CREATE INDEX idx_content_mappings_micro_learning ON content_mappings(micro_learning_id);
CREATE INDEX idx_content_mappings_content ON content_mappings(content_id);

-- Enable RLS
ALTER TABLE micro_learnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_mappings ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Authenticated users can read micro_learnings"
  ON micro_learnings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read content_mappings"
  ON content_mappings
  FOR SELECT
  TO authenticated
  USING (true);