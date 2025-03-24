import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/verify-license', (req, res) => {
  const licenseKey = req.query.key;
  const licenses = JSON.parse(fs.readFileSync('./licenses.json'));

  if (licenses[licenseKey] && licenses[licenseKey].valid) {
    res.json({ valid: true, owner: licenses[licenseKey].owner });
  } else {
    res.json({ valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`License server running on port ${PORT}`);
});