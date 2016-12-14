const express = require("express");
const bodyParser = require("body-parser");

const Pusher = require("pusher");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: "REDACTED",
  key: "REDACTED",
  secret: "REDACTED"
});

app.post("/pusher/auth", (req, res) => {
  const presenceData = { user_id: req.body.socket_id, };
  const auth = pusher.authenticate(
    req.body.socket_id,
    req.body.channel_name,
    presenceData
  );
  res.header("Access-Control-Allow-Origin", null);
  res.send(auth);
});

app.post("/pusher/trigger/time", (req, res) => {
  res.header("Access-Control-Allow-Origin", null);
  pusher.trigger("private-ch", "time", { hitServer: Date.now() });
  res.send(true);
});

app.listen(5000);
