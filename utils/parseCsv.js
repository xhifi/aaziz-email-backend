module.exports = function parseCsv(buffer) {
  const file = buffer.toString().split("\r\n");
  const rows = file.map((row) => row.split(", ")).reverse();
  const header = rows.pop();
  const values = rows.reverse();
  const content = values.map((val) => {
    return {
      email: val[0].trim(),
      name: val[1].trim(),
      sector: val[2].trim(),
    };
  });

  return { header, content };
};
