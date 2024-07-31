const pool = require("../actions");

export async function createMedicine(obj) {
  const columns = Object.keys(obj).join(", ");
  const placeholders = Object.keys(obj)
    .map(() => "?")
    .join(", ");
  const values = Object.values(obj);
  const [result] = await pool.query(
    `
    INSERT INTO Medicines (${columns})
    VALUES (${placeholders})
  `,
    values
  );
  return result;
}

export async function getMedicine(medicineID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Medicines
    WHERE MedicineID = ?
  `,
    [medicineID]
  );
  return rows[0];
}

export async function getAllMedicines() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Medicines
  `);
  return rows;
}

export async function deleteMedicine(medicineID) {
  const [result] = await pool.query(
    `
    DELETE FROM Medicines
    WHERE MedicineID = ?
  `,
    [medicineID]
  );
  return result;
}

export async function updateMedicine(medicineID, obj) {
  const updates = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(medicineID);
  const [result] = await pool.query(
    `
    UPDATE Medicines
    SET ${updates}
    WHERE MedicineID = ?
  `,
    values
  );
  return result;
}
