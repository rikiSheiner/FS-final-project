const pool = require("../actions");

export async function createReferral(obj) {
  const columns = Object.keys(obj).join(", ");
  const placeholders = Object.keys(obj)
    .map(() => "?")
    .join(", ");
  const values = Object.values(obj);
  const [result] = await pool.query(
    `
    INSERT INTO Referrals (${columns})
    VALUES (${placeholders})
  `,
    values
  );
  return result;
}

export async function getReferral(referralID) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM Referrals
    WHERE ReferralID = ?
  `,
    [referralID]
  );
  return rows[0];
}

export async function getAllReferrals() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Referrals
  `);
  return rows;
}

export async function deleteReferral(referralID) {
  const [result] = await pool.query(
    `
    DELETE FROM Referrals
    WHERE ReferralID = ?
  `,
    [referralID]
  );
  return result;
}


export async function updateReferral(referralID, obj) {
  const updates = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(referralID);
  const [result] = await pool.query(
    `
    UPDATE Referrals
    SET ${updates}
    WHERE ReferralID = ?
  `,
    values
  );
  return result;
}

export async function getReferralsByPatient(patientID) {
    const [rows] = await pool.query(
      `
        SELECT * 
        FROM Referrals
        WHERE PatientID = ?
      `,
      [patientID]
    );
    return rows;
  }
  
  export async function getReferralsByDoctor(doctorID) {
    const [rows] = await pool.query(
      `
        SELECT * 
        FROM Referrals
        WHERE DoctorID = ?
      `,
      [doctorID]
    );
    return rows;
  }