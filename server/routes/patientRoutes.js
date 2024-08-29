import express from 'express';
const router_of_patient = express.Router();
import patientsController from '../controllers/patientesControler.js';

router_of_patient.post('/sign-in', patientsController.signIn);
router_of_patient.post('/login', patientsController.loginUser);

router_of_patient.get('/patients', patientsController.getPatientsWithFilter);
router_of_patient.get('/refferals', patientsController.getPatientRefferals);
router_of_patient.get('/prescriptions', patientsController.getPatientPrescriptions);
router_of_patient.post('/prescription-requests', patientsController.createPrescriptionRequest);
router_of_patient.get('/patients/:id/prescription-requests', patientsController.getPrescriptionRequestOfPatient);
router_of_patient.get('/patients/:id/incompleted-prescription-requests', patientsController.getIncompletedPrescriptionReqtOfPatient);
router_of_patient.post('/:id/card-requests', patientsController.createNewCardRequest);

router_of_patient.get('/appointments/available/:specialty', patientsController.getAvailableAppointments);
router_of_patient.post('/appointments/book', patientsController.bookAppointment);

router_of_patient.post('/users', patientsController.createUser);
router_of_patient.get('/users/:id', patientsController.getUser);
router_of_patient.get('/users', patientsController.getAllUsers);
router_of_patient.delete('/users/:id', patientsController.deleteUser);
router_of_patient.put('/users/:id', patientsController.updateUser);


router_of_patient.get('/professions', patientsController.getProfession);

//router_of_patient.get('/medicines/:name', patientsController.searchMedicineByName); // חיפוש תרופה לפי שם
router_of_patient.get('/medicines', patientsController.getAllMedicines); // קבלת כל התרופות

router_of_patient.get('/medicines/with-prescription', patientsController.getAllMedicinesWithPrescription);
router_of_patient.get('/medicines/without-prescription', patientsController.getAllMedicinesWithoutPrescription);

router_of_patient.post('/medicines/order', patientsController.orderMedicine); // הזמנת תרופה

router_of_patient.get('/users/:userId/addresses', patientsController.getAllAddresses); // קבלת כל הכתובות של משתמש

router_of_patient.get('/users/:userId/account-details', patientsController.getAllAccountDetails); // קבלת כל פרטי החשבון של משתמש

export default router_of_patient;