/*
  # Initial Curriculum Schema

  1. New Tables
    - `thematic_axes`: Core curriculum structure
    - `topics`: Subject areas within axes
    - `contents`: Specific learning content
  
  2. Relationships
    - Topics belong to ThematicAxis
    - Contents belong to Topic
    
  3. Indexes
    - Added indexes for foreign keys and common queries
*/

-- Create thematic_axes table
CREATE TABLE IF NOT EXISTS thematic_axes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id SERIAL PRIMARY KEY,
  axis_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (axis_id) REFERENCES thematic_axes(id)
);

-- Create contents table
CREATE TABLE IF NOT EXISTS contents (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  sequence_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

-- Create indexes
CREATE INDEX idx_topics_axis_id ON topics(axis_id);
CREATE INDEX idx_contents_topic_id ON contents(topic_id);
CREATE INDEX idx_contents_sequence ON contents(sequence_order);