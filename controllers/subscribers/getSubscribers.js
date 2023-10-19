const pool = require("../../utils/pg");
const { BadRequest, NotFound } = require("../../errors");

module.exports = async (req, res) => {
  const allSubscribers = await pool.query(`SELECT * FROM subscribers`);
  if (allSubscribers.rowCount < 1) {
    throw new NotFound("No subscribers");
  }

  return res.send({ data: allSubscribers.rows });
};
