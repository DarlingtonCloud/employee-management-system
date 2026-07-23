const pool = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY id');
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, department, role, salary, hireDate } = req.body;
    const result = await pool.query(
      `INSERT INTO employees (name, email, department, role, salary, hire_date)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, email, department, role, salary, hireDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, email, department, role, salary, hireDate } = req.body;
    const result = await pool.query(
      `UPDATE employees SET name=$1, email=$2, department=$3, role=$4, salary=$5, hire_date=$6
       WHERE id=$7 RETURNING *`,
      [name, email, department, role, salary, hireDate, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
};