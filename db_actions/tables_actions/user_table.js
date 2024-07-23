const pool = require("../actions");

export async function createUser(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO Users (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    return result
  }

  export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ${id}
    `)
    return rows[0]
  }
 
  export async function getAllUsers() {
    const [rows] = await pool.query(`
     "SELECT * FROM customers" 
    `)
    return rows
  }

  export async function deleteUser(id) {
    const [result] = await pool.query(`
    "DELETE FROM customers WHERE UserID = ${id}"
    `)
    return result
  }
// יש לשלוח את הערכים בצורה של מילון עם מפתח וערך כשהמפתח הוא השדה
  export async function updateUser(id, fieldsToUpdate) {
    // בנה את חלק ה-SET של השאילתה בצורה דינמית
    const setString = Object.keys(fieldsToUpdate)
      .map(key => `${key} = ?`)
      .join(', ');
  
    // הכנת מערך הערכים
    const values = Object.values(fieldsToUpdate);
  
    // הוסף את ה-ID של המשתמש בסוף המערך של הערכים
    values.push(id);
  
    // הרצת השאילתה עם הפרמטרים הדינמיים
    const [rows] = await pool.query(`
      UPDATE Users SET ${setString} WHERE UserID = ?
    `, values);
  
    return rows;
  }

  
