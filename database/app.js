import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import db from './db.js';
import audioRoutes from './routes/audioRoutes.js';
import includeRoutes from './routes/includeRoutes.js';
import tabletsRoutes from './routes/tabletsRoutes.js';
import featuresRoutes from './routes/featuresRoutes.js';
import featuredFeatures from './routes/featuredFeaturesRoutes.js';
import cooksRoutes from './routes/cooksRoutes.js';
import headsetsRoutes from './routes/headsetsRoutes.js';
import notebooksRoutes from './routes/notebooksRoutes.js';
import discontinuosRoutes from './routes/discontinuosRoutes.js';
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.API_URL || 8000;

console.log(PORT)

app.use(cors());
app.use(express.json());
app.use('/audio', audioRoutes);
app.use('/includes', includeRoutes);
app.use('/tablets', tabletsRoutes);
app.use('/features', featuresRoutes);
app.use('/featuredFeatures', featuredFeatures);
app.use('/cooks', cooksRoutes);
app.use('/headsets', headsetsRoutes);
app.use('/notebooks', notebooksRoutes);
app.use('/discontinuos', discontinuosRoutes);

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
