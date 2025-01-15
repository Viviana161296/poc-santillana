# Educational Platform Implementation Requirements

## Project Overview
Create a full-stack web application for managing relationships between micro-learning content and the Mexican mathematics curriculum for 1st-grade secondary education, with integrated AI-powered content generation.

## Technical Stack Requirements

### Frontend
- React with TypeScript
- State management: Redux Toolkit
- UI Framework: Material-UI or Tailwind CSS
- React Router for navigation
- React Query for API data management
- Authentication integration with AWS Cognito

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Prisma as ORM
- AWS SDK for service integration
- JWT authentication

### Cloud Infrastructure
- AWS Services:
  - ECS/Fargate for container orchestration
  - RDS for PostgreSQL database
  - S3 for content storage
  - CloudFront for content delivery
  - Cognito for authentication
  - API Gateway for API management
  - Lambda for serverless functions
  - Bedrock for LLM integration

## Core Features

### 1. Curriculum Management
- CRUD operations for curriculum structure
- Data model following the specified JSON schema
- Validation for curriculum relationships
- Search and filter capabilities

### 2. Micro-learning Content Management
- CRUD operations for micro-learning content
- Content type handling (video, text, interactive, quiz)
- File upload integration with S3
- Content metadata management

### 3. Relationship Mapping
- Interface for mapping micro-learning to curriculum topics
- Coverage visualization
- Validation rules enforcement
- Bulk mapping capabilities

### 4. AI Content Generation
- Integration with AWS Bedrock
- Prompt template management
- Content generation interface
- Generated content preview and editing
- Content validation and storage

## Database Schema

```sql
-- Curriculum Structure
CREATE TABLE thematic_axes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  axis_id INTEGER REFERENCES thematic_axes(id),
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE contents (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES topics(id),
  content TEXT NOT NULL,
  sequence_order INTEGER
);

-- Micro-learning Content
CREATE TABLE micro_learnings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  duration INTEGER,
  content_url TEXT,
  skill_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mappings
CREATE TABLE content_mappings (
  id SERIAL PRIMARY KEY,
  micro_learning_id INTEGER REFERENCES micro_learnings(id),
  content_id INTEGER REFERENCES contents(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated Content
CREATE TABLE generated_contents (
  id SERIAL PRIMARY KEY,
  prompt_template TEXT NOT NULL,
  parameters JSONB,
  generated_content TEXT,
  micro_learning_id INTEGER REFERENCES micro_learnings(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Curriculum Management
```typescript
// Get curriculum structure
GET /api/curriculum
GET /api/curriculum/:axisId/topics
GET /api/curriculum/:topicId/contents

// Manage curriculum
POST /api/curriculum/axis
POST /api/curriculum/topic
POST /api/curriculum/content
```

### Micro-learning Management
```typescript
// CRUD operations
GET /api/microlearning
POST /api/microlearning
PUT /api/microlearning/:id
DELETE /api/microlearning/:id

// Content mapping
POST /api/microlearning/:id/map
GET /api/microlearning/:id/mappings
```

### Content Generation
```typescript
// Generate content
POST /api/content/generate
{
  topicId: string;
  contentType: string;
  skillLevel: string;
  parameters: {
    exerciseCount: number;
    context: string;
    includeSteps: boolean;
  }
}

// Save generated content
POST /api/content/save
GET /api/content/history
```

## Frontend Components

### Page Structure
```typescript
interface PageLayout {
  pages: {
    dashboard: {
      path: '/',
      components: ['CurriculumOverview', 'ContentStats']
    },
    curriculum: {
      path: '/curriculum',
      components: ['CurriculumTree', 'TopicDetails']
    },
    microlearning: {
      path: '/content',
      components: ['ContentList', 'ContentEditor', 'MappingDialog']
    },
    generation: {
      path: '/generate',
      components: ['PromptBuilder', 'ContentPreview', 'GenerationHistory']
    }
  }
}
```

### Key Components

#### CurriculumManager
```typescript
interface CurriculumManagerProps {
  onSelect: (topicId: string) => void;
  onUpdate: (data: CurriculumData) => void;
}

interface CurriculumData {
  axis: string;
  topics: Topic[];
  contents: Content[];
}
```

#### ContentMapping
```typescript
interface ContentMappingProps {
  microLearningId: string;
  onMap: (mappings: Mapping[]) => void;
}

interface Mapping {
  contentId: string;
  skillLevel: string;
  metadata: Record<string, unknown>;
}
```

#### ContentGenerator
```typescript
interface ContentGeneratorProps {
  topicId: string;
  onGenerate: (content: GeneratedContent) => void;
}

interface GeneratedContent {
  content: string;
  metadata: {
    prompt: string;
    parameters: Record<string, unknown>;
    timestamp: string;
  }
}
```

## Implementation Steps

1. Setup Project Structure
   - Initialize React frontend with TypeScript
   - Setup Node.js backend with Express
   - Configure AWS infrastructure with CloudFormation

2. Database Implementation
   - Setup PostgreSQL with RDS
   - Implement Prisma schema and migrations
   - Create database access layer

3. Backend Development
   - Implement API endpoints
   - Setup authentication with Cognito
   - Integrate with AWS Bedrock
   - Implement content generation logic

4. Frontend Development
   - Create React components
   - Implement state management
   - Setup API integration
   - Create user interface

5. Testing and Deployment
   - Unit testing with Jest
   - Integration testing
   - AWS deployment configuration
   - CI/CD pipeline setup

## Additional Requirements

1. Authentication & Authorization
   - Role-based access control
   - Secure API endpoints
   - Session management

2. Performance
   - Content caching
   - API response optimization
   - Image optimization

3. Monitoring
   - Error tracking
   - Usage analytics
   - Performance monitoring

4. Security
   - Input validation
   - XSS protection
   - CSRF protection
   - Rate limiting

Please implement the application following these requirements and best practices for scalability, maintainability, and security.
