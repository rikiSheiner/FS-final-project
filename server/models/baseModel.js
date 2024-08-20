//const pool = require('../config/dbConfig');
import pool from '../config/dbConfig.js';

export default class BaseModel {
  constructor(table) {
    this.table = table;
  }

  async create(data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const [result] = await pool.query(`
      INSERT INTO ${this.table} (${columns})
      VALUES (${placeholders})
    `, values);
    return result;
  }

  async findByProp(propName, propValue) {
    const [rows] = await pool.query(`
      SELECT * 
      FROM ${this.table}
      WHERE ${propName} = ?
    `, [propValue]);
    return rows[0];
  }

  async findAll() {
    const [rows] = await pool.query(`
      SELECT * 
      FROM ${this.table}
    `);
    return rows;
  }

    // Method to get all rows with a filter
  async getAllWithFilter(filterPropName, filterPropValue) {
      const [rows] = await pool.query(`
        SELECT * 
        FROM ${this.table}
        WHERE ${filterPropName} = ?
      `, [filterPropValue]);
      return rows;
    }

  async deleteByProp(propName, propValue) {
    const [result] = await pool.query(`
      DELETE FROM ${this.table}
      WHERE ${propName} = ?
    `, [propValue]);
    return result;
  }

  async updateByProp(propName, propValue, data) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    values.push(propValue);
    const [result] = await pool.query(`
      UPDATE ${this.table}
      SET ${updates}
      WHERE ${propName} = ?
    `, values);
    return result;
  }
}

//module.exports = BaseModel;
