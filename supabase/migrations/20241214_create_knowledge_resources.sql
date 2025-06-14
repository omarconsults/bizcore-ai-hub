
-- Create knowledge_resources table
CREATE TABLE IF NOT EXISTS knowledge_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('guide', 'template', 'video', 'course')) NOT NULL,
  category TEXT NOT NULL,
  source TEXT,
  tags TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  duration TEXT,
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_resources_category ON knowledge_resources(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_resources_type ON knowledge_resources(type);
CREATE INDEX IF NOT EXISTS idx_knowledge_resources_rating ON knowledge_resources(rating DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_resources_tags ON knowledge_resources USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_knowledge_resources_search ON knowledge_resources USING GIN(to_tsvector('english', title || ' ' || description));

-- Enable RLS (Row Level Security)
ALTER TABLE knowledge_resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read resources
CREATE POLICY "Allow all users to read knowledge resources" ON knowledge_resources
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert resources
CREATE POLICY "Allow authenticated users to insert knowledge resources" ON knowledge_resources
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update resources
CREATE POLICY "Allow authenticated users to update knowledge resources" ON knowledge_resources
  FOR UPDATE USING (auth.role() = 'authenticated');
