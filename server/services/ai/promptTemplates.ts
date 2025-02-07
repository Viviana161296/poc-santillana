export const promptTemplates = {
  exercise: (topic: string, level: string) => `
Create a exercise for ${topic} at ${level} level.
Include:
- Problem statement
- Step-by-step solution
- Key concepts used
`,
  
  explanation: (topic: string, level: string) => `
Provide a clear explanation of${topic} at ${level} level.
- Main concept
- Key formulas
- Real-world examples
- Common misconceptions
`,

  quiz: (topic: string, questionCount: number, level: string) => `
Generate ${questionCount} multiple choice questions about ${topic} at ${level} level.
For each question include:
- Question text
- 4 options
- Correct answer
- Brief explanation
`
};