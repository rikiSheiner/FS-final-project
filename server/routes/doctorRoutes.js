import express from 'express';
const router_of_doctor = express.Router();
import doctorController from '../controllers/doctorController.js';

router_of_doctor.post('/id', doctorController.getDoctor);
router_of_doctor.get('/doctors', doctorController.getAllDoctors);
router_of_doctor.delete('/doctors/:id', doctorController.deleteDoctor);
router_of_doctor.put('/doctors/:id', doctorController.updateDoctor);
//router_of_doctor.post('/filter', doctorController.getDoctorsWithFilter);
router_of_doctor.get('/filter', doctorController.getDoctorsWithFilter);

// נתיב לקבלת כל המטופלים של רופא מסוים
router_of_doctor.get('/patients', doctorController.getPatientsByDoctorID);


router_of_doctor.get('/specialties', doctorController.getSpecialties);

router_of_doctor.get('/doctors/:id/appointments', doctorController.getAppointmentsByDoctorId);
router_of_doctor.get('/doctors/:id/available-times', doctorController.getAvailableTimes);

router_of_doctor.get('/patients/:userId', doctorController.getPatientByUserId);

router_of_doctor.post('/get/Prescriptions',doctorController.getPrescriptions);  //חדש 
router_of_doctor.post('/referrals', doctorController.creataReffral);
router_of_doctor.post('/prescriptions', doctorController.createPrescription);
router_of_doctor.post('/getMedName',doctorController.getMedName);
router_of_doctor.put('/approvedAlter',doctorController.alterApprove);

// בקשות מרשמים של מטופל מסוים שלא אושרו
router_of_doctor.get('/unapproved-prescription-requests', doctorController.getUnapprovedPrescriptionRequests);

router_of_doctor.get('/appointments', doctorController.getAppointmentsByDoctorIdWithQuery);

// קבלת סטטיסטיקות על רופא מסוים
router_of_doctor.get('/statistics', doctorController.getStatistics);

// קבלת מפגשים עתידיים בלבד של רופא מסוים
router_of_doctor.get('/future-appointments', doctorController.getFutureAppointments);

router_of_doctor.get('/prescriptions', doctorController.getPrescriptions);

export default router_of_doctor;