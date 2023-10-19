const Pool = require("pg").Pool;
const { SUPABASE_HOST, SUPABASE_DATABASE, SUPABASE_PORT, SUPABASE_USER, SUPABASE_PASSWORD } = process.env;

const pg = new Pool({
  host: SUPABASE_HOST,
  database: SUPABASE_DATABASE,
  port: SUPABASE_PORT,
  user: SUPABASE_USER,
  password: SUPABASE_PASSWORD,
});

module.exports = pg;
