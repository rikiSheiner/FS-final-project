const pool = require("../actions");

export async function createMedicineOrder(obj) {
  const columns = Object.keys(obj).join(", ");
  const placeholders = Object.keys(obj)
    .map(() => "?")
    .join(", ");
  const values = Object.values(obj);
  const [result] = await pool.query(
    `
    INSERT INTO MedicineOrders (${columns})
    VALUES (${placeholders})
  `,
    values
  );
  return result;
}

export async function getMedicineOrder(orderID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM MedicineOrders
    WHERE OrderID = ?
  `,
    [orderID]
  );
  return rows[0];
}

export async function getAllMedicineOrders() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM MedicineOrders
  `);
  return rows;
}

export async function deleteMedicineOrder(orderID) {
  const [result] = await pool.query(
    `
    DELETE FROM MedicineOrders
    WHERE OrderID = ?
  `,
    [orderID]
  );
  return result;
}

export async function updateMedicineOrder(orderID, obj) {
  const updates = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(orderID);
  const [result] = await pool.query(
    `
    UPDATE MedicineOrders
    SET ${updates}
    WHERE OrderID = ?
  `,
    values
  );
  return result;
}

export async function getMedicineOrdersByPatient(patientID) {
  const [rows] = await pool.query(
    `
        SELECT * 
        FROM MedicineOrders
        WHERE PatientID = ?
      `,
    [patientID]
  );
  return rows;
}
