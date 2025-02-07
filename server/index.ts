import express from 'express'; // Correcto
import cors from 'cors';
import router from './routes/contentGeneration.ts'; // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 5002;

// Middleware para procesar el cuerpo de las solicitudes JSON
app.use(express.json());

// Habilita CORS
app.use(cors());

// Usa las rutas
app.use('/api', router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});