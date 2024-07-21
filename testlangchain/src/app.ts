import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import interactionRoutes from './routes/interaction';
import patientRoutes from './routes/patient';
import doctorRoutes from './routes/doctors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const cors = require('cors');

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MongoDB connection string is missing');
  process.exit(1);
}

mongoose.connect(mongoUri, {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());

app.use('/interactions', interactionRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});