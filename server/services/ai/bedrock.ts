import { config } from 'dotenv';
config(); // Carga las variables de entorno desde .env

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

console.log(process.env.NODE_ENV); // "development", "production", o "test"

// Verificación de las variables de entorno
if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("Faltan variables de entorno para AWS.");
}

// Inicialización del cliente de AWS Bedrock
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Función para generar contenido usando Amazon Bedrock
export async function generateContent(prompt: string, parameters: Record<string, any>) {
  console.log('Generating content with Bedrock...');

  // Construcción del cuerpo de la solicitud
  const command = new InvokeModelCommand({
    modelId: 'amazon.nova-lite-v1:0', // Cambia al modelo correcto si es necesario
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      "inferenceConfig": {
        "max_new_tokens": parameters?.maxTokens || 1000,
      },
      messages: [
        {
          role: 'user',
          content: [
            {"text": "Eres un asistente para maestros y alumnos de una escuela privada, responde en español y utiliza emojis para ilustrar"},
            { "text": prompt }
          ] 

        }
      ]
    }),
  });

  try {
    const response = await client.send(command);
    console.log('response', response.body);

    // Decodificando la respuesta
    const decodedResponse = new TextDecoder().decode(response.body); // Decodifica el Uint8Array
    const result = JSON.parse(decodedResponse); // Parseamos el texto a un objeto JSON

    // Extraemos el contenido generado por el modelo
    const generatedText = result.output.message.content[0].text;
  
    return { completion: generatedText };
  } catch (error) {
    console.error("Error generating content with Bedrock:", error);
    throw error;
  }
}