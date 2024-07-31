const pool = require("../actions");

export async function createDoctor(obj) {
  const columns = Object.keys(obj).join(", ");
  const placeholders = Object.keys(obj)
    .map(() => "?")
    .join(", ");
  const values = Object.values(obj);
  const [result] = await pool.query(
    `
    INSERT INTO Doctors (${columns})
    VALUES (${placeholders})
  `,
    values
  );
  return result;
}

export async function getDoctor(doctorID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Doctors
    WHERE DoctorID = ?
  `,
    [doctorID]
  );
  return rows[0];
}

export async function getAllDoctors() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Doctors
  `);
  return rows;
}

export async function deleteDoctor(doctorID) {
  const [result] = await pool.query(
    `
    DELETE FROM Doctors
    WHERE DoctorID = ?
  `,
    [doctorID]
  );
  return result;
}

export async function updateDoctor(doctorID, obj) {
  const updates = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(doctorID);
  const [result] = await pool.query(
    `
    UPDATE Doctors
    SET ${updates}
    WHERE DoctorID = ?
  `,
    values
  );
  return result;
}

export async function getDoctorsByProfession(profession) {
  const [rows] = await pool.query(
    `
      SELECT * 
      FROM Doctors
      WHERE Profession = ?
    `,
    [profession]
  );
  return rows;
}
