const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/doctors/:id', doctorController.getDoctor);
router.get('/doctors', doctorController.getAllDoctors);
router.delete('/doctors/:id', doctorController.deleteDoctor);
router.put('/doctors/:id', doctorController.updateDoctor);
router.get('/doctors/filter', doctorController.getDoctorsWithFilter);

router.get('/specialties', doctorController.getSpecialties);

router.get('/doctors/:id/appointments', doctorController.getAppointmentsByDoctorId);
router.get('/doctors/:id/available-times', doctorController.getAvailableTimes);

router.get('/patients/:userId', doctorController.getPatientByUserId);

router.post('/referrals', doctorController.creatAReffral);
router.post('/prescriptions', doctorController.createPrescription);

module.exports = router;
