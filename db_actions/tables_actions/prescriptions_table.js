const pool = require("../actions");

export async function createPrescription(obj) {
  const columns = Object.keys(obj).join(", ");
  const placeholders = Object.keys(obj)
    .map(() => "?")
    .join(", ");
  const values = Object.values(obj);
  const [result] = await pool.query(
    `
    INSERT INTO Prescriptions (${columns})
    VALUES (${placeholders})
  `,
    values
  );
  return result;
}

export async function getPrescription(prescriptionID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Prescriptions
    WHERE PrescriptionID = ?
  `,
    [prescriptionID]
  );
  return rows[0];
}

export async function getAllPrescriptions() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Prescriptions
  `);
  return rows;
}

export async function deletePrescription(prescriptionID) {
  const [result] = await pool.query(
    `
    DELETE FROM Prescriptions
    WHERE PrescriptionID = ?
  `,
    [prescriptionID]
  );
  return result;
}

export async function updatePrescription(prescriptionID, obj) {
  const updates = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(prescriptionID);
  const [result] = await pool.query(
    `
    UPDATE Prescriptions
    SET ${updates}
    WHERE PrescriptionID = ?
  `,
    values
  );
  return result;
}

export async function getPrescriptionsByDoctor(doctorID) {
  const [rows] = await pool.query(
    `
      SELECT * 
      FROM Prescriptions
      WHERE DoctorID = ?
    `,
    [doctorID]
  );
  return rows;
}

export async function getPrescriptionsByPatient(patientID) {
  const [rows] = await pool.query(
    `
      SELECT * 
      FROM Prescriptions
      WHERE PatientID = ?
    `,
    [patientID]
  );
  return rows;
}
