import express from 'express';
import router_of_patient from './routes/patientRoutes.js';
import router_of_doctor from './routes/doctorRoutes.js';
const app = express();
const PORT = 3001;

app.use('/api/patients', router_of_patient);
app.use('/api/doctors', router_of_doctor);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});