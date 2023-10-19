const { google } = require("googleapis");

module.exports = async () => {
  const googleAuth = new google.auth.GoogleAuth({ keyFile: "credentials.json", scopes: "https://www.googleapis.com/auth/spreadsheets" });
  const auth = await googleAuth.getClient();
  const gSheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1789RX2cZ9eF0fpgKGkYyKkMJkGeEQcNkSTRaqcBPOAM";
  return { auth, spreadsheetId, gSheets };
};
