const pool = require("../../utils/pg");
const { NotFound, BadRequest } = require("../../errors");

module.exports = async (req, res) => {
  const { email } = req.params;

  const emailExists = await pool.query(`SELECT * FROM subscribers WHERE email = $1`, [email]);
  if (emailExists.rowCount < 1) {
    return new NotFound(`${email} doesn't exist`);
  }

  if (emailExists.rows[0].subscribed_status === false) {
    return res.send({ msg: "Already unsubscribed." });
  }

  const unsubscribeEmail = await pool.query(`UPDATE subscribers SET subscribed_status = $1 WHERE email = $2 RETURNING *`, [false, email]);
  if (unsubscribeEmail.rowCount < 1) {
    return new BadRequest("Some error ocurred while updating contact.");
  }

  return res.json({ msg: `${unsubscribeEmail.rows[0].email} has been unsubscribed from the newsletter.` });
};
