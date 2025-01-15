export const promptTemplates = {
  exercise: (topic: string, level: string) => `
Create a mathematics exercise for ${topic} at ${level} level.
Include:
- Problem statement
- Step-by-step solution
- Key concepts used
`,
  
  explanation: (topic: string) => `
Provide a clear explanation of ${topic} including:
- Main concept
- Key formulas
- Real-world examples
- Common misconceptions
`,

  quiz: (topic: string, questionCount: number) => `
Generate ${questionCount} multiple choice questions about ${topic}.
For each question include:
- Question text
- 4 options
- Correct answer
- Brief explanation
`
};