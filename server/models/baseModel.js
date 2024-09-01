import pool from "../config/dbConfig.js";

export default class BaseModel {
  constructor(table) {
    this.table = table;
  }

  async create(data) {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);
  
    console.log('Inserting data:', { columns, placeholders, values }); 
  
    try {
      const [result] = await pool.query(`
        INSERT INTO ${this.table} (${columns})
        VALUES (${placeholders})
      `, values);
      return result;
    } catch (err) {
      console.error('Database Error:', err); 
      throw new Error('Database error: ' + err.message); 
    }
   
  }
  
  

  async findByProp(propName, propValue) {
    console.log(
      `Querying table ${this.table} where ${propName} = ${propValue}`
    );

    const [rows] = await pool.query(
      `
      SELECT * 
      FROM ${this.table}
      WHERE ${propName} = ?
    `,
      [propValue]
    );
    // console.log(rows);
    return rows[0];
    //return rows;
  }

  async findAll() {
    const [rows] = await pool.query(`
      SELECT * 
      FROM ${this.table}
    `);
    return rows;
  }

  async findDistinct(column) {
    const [rows] = await pool.query(`
      SELECT DISTINCT ${column} 
      FROM ${this.table}
    `);
    return rows;
  }

    async getAllWithFilter(filterPropName, filterPropValue) {
      console.log(`Querying ${this.table} with ${filterPropName} = ${filterPropValue}`);
      const [rows] = await pool.query(`
        SELECT * 
        FROM ${this.table}
        WHERE ${filterPropName} = ?
      `,
      [filterPropValue]
    );
    return rows;
  }

  async getAllWithMultipleFilters(filters) {
    const filterKeys = Object.keys(filters);
    const filterValues = Object.values(filters);
    
    const whereClause = filterKeys.map(key => `${key} = ?`).join(" AND ");
    
    const [rows] = await pool.query(`
      SELECT * 
      FROM ${this.table}
      WHERE ${whereClause}
    `, filterValues);

    return rows;
  }

  async deleteByProp(propName, propValue) {
    const [result] = await pool.query(
      `
      DELETE FROM ${this.table}
      WHERE ${propName} = ?
    `,
      [propValue]
    );
    return result;
  }

  async updateByProp(propName, propValue, data) {
    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    values.push(propValue);
    const [result] = await pool.query(
      `
      UPDATE ${this.table}
      SET ${updates}
      WHERE ${propName} = ?
    `,
      values
    );
    return result;
  }
}

