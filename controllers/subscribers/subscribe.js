const pool = require("../../utils/pg");
const { BadRequest } = require("../../errors");

module.exports = async (req, res) => {
  const { email, name, sector } = req.body;
  if (!email || !name || !sector) {
    throw new BadRequest(`Provide name, email and sector to which you wish that email to be subscribed to.`);
  }

  const emailExists = await pool.query(`SELECT * FROM subscribers WHERE email = $1`, [email]);
  if (emailExists.rowCount < 1) {
    const subscriberAdded = await pool.query(
      `INSERT INTO subscribers (name, email, sector, subscribed_status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, sector, true]
    );
    return res.json({ msg: `${subscriberAdded.rows[0].email} has been subscribed. Thank you!` });
  }

  if (!emailExists.rows[0].subscribed_status) {
    const toggledSubsciberStatus = await pool.query(
      `UPDATE subscribers SET subscribed_status = $1, sector = $2 WHERE email = $3 RETURNING *`,
      [true, sector, email]
    );
    return res.json({ msg: `${toggledSubsciberStatus.rows[0].email} has been subscribed. Thank you!` });
  }

  return res.send({ msg: `${email} already subscribed` });
};
