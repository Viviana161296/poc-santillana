import express from 'express';

// Luego, accedes a los tipos como
const app = express();
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;



import { generateContent } from '../services/ai/bedrock.ts'; // Importa el servicio de generación de contenido
import { promptTemplates } from '../services/ai/promptTemplates.ts'; // Importa las plantillas de prompts
// import { microLearningRepository } from '../db/repositories/microLearningRepository'; // Descomenta si usas un repositorio para guardar contenido

export const contentGenerationController = {
  async generate(req: Request, res: Response, next: NextFunction) {
    console.log('contentGeneration ts...');

    try {
      // Extrae los parámetros del cuerpo de la solicitud
      const { p_topic, p_type, p_skill_level, p_parameters } = req.body;

      // Valida que los campos requeridos estén presentes
      if (!p_topic || !p_type || !p_skill_level) {
        console.log(p_topic, p_type, p_skill_level);
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud." });
      }

      // Obtiene la plantilla de prompt correspondiente al tipo de contenido
      const promptTemplate = promptTemplates[p_type];
      if (!promptTemplate) {
        return res.status(400).json({ error: 'Tipo de contenido no válido.' });
      }

      // Genera el prompt usando la plantilla y los parámetros
      const prompt = promptTemplate(p_topic, p_skill_level);

      // Genera el contenido usando el servicio de Amazon Bedrock
      const content = await generateContent(prompt, p_parameters);

      console.log(content);

      // Devuelve el contenido generado en la respuesta
      res.json({ content });
    } catch (error) {
      // Maneja cualquier error que ocurra durante el proceso
      next(error);
    }
  },

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      // Extrae los datos del cuerpo de la solicitud
      const { title, content, type, skillLevel } = req.body;

      // Valida que los campos requeridos estén presentes
      if (!title || !content || !type || !skillLevel) {
        return res.status(400).json({ error: "Faltan campos requeridos en el cuerpo de la solicitud." });
      }

      // Guarda el contenido en la base de datos (descomenta si usas un repositorio)
      // const microLearning = await microLearningRepository.create({
      //   title,
      //   type,
      //   skill_level: skillLevel,
      //   content_url: null, // Aquí podrías guardar una URL si el contenido se almacena en un servicio externo
      //   duration: null // Puedes calcular la duración si es necesario
      // });

      // Devuelve el contenido guardado en la respuesta
      // res.status(201).json(microLearning);

      // Respuesta temporal si no usas el repositorio
      res.status(201).json({ message: "Contenido recibido correctamente.", data: { title, content, type, skillLevel } });
    } catch (error) {
      // Maneja cualquier error que ocurra durante el proceso
      next(error);
    }
  }
};