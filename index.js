const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(

  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

app.get("/", (req, res) => {
  res.send("ESP32 server running");
});

app.get("/alert", async (req, res) => {
  try {
    const call = await client.calls.create({
      to: process.env.TARGET_PHONE,
      from: process.env.TWILIO_PHONE,
      twiml: `<Response><Say voice="alice">Canh bao! Co chuyen dong duoc phat hien.</Say></Response>`
    });

    res.json({ success: true, sid: call.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
