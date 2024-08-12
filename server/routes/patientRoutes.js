const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/userController');

router.post('/sign-in', patientsController.signIn);
router.post('/login', patientsController.loginUser);

router.get('/patients', patientsController.getPatientsWithFilter);
router.get('/patients/:id/refferals', patientsController.getPatientRefferals);
router.get('/patients/:id/prescriptions', patientsController.getPatientPrescriptions);
router.post('/patients/:id/prescription-requests', patientsController.createPrescriptionRequest);
router.get('/patients/:id/prescription-requests', patientsController.getPrescriptionRequestOfPatient);
router.get('/patients/:id/incompleted-prescription-requests', patientsController.getIncompletedPrescriptionReqtOfPatient);
router.post('/patients/:id/card-requests', patientsController.createNewCardRequest);

router.get('/appointments/available/:specialty', patientsController.getAvailableAppointments);
router.post('/appointments/book', patientsController.bookAppointment);

router.post('/users', patientsController.createUser);
router.get('/users/:id', patientsController.getUser);
router.get('/users', patientsController.getAllUsers);
router.delete('/users/:id', patientsController.deleteUser);
router.put('/users/:id', patientsController.updateUser);

router.get('/medicines/:name', patientsController.searchMedicineByName); // חיפוש תרופה לפי שם
router.get('/medicines', patientsController.getAllMedicines); // קבלת כל התרופות
router.post('/medicines/order', patientsController.orderMedicine); // הזמנת תרופה


module.exports = router;
