import express from 'express';
import patientesControler from '../controllers/patientesControler.js'; // שנה את הנתיב בהתאם למיקום שלך

const app = express();
app.use(express.json());

// הגדרת נתיב לבדיקה
app.get('/medicines', patientsControler.getAllMedicines);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
