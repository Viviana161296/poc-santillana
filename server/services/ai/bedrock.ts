import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

export async function generateContent(prompt: string, parameters: Record<string, any>) {
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-v2',
    body: JSON.stringify({
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      ...parameters
    })
  });

  const response = await client.send(command);
  return JSON.parse(new TextDecoder().decode(response.body));
}