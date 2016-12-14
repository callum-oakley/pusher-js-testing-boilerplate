Pusher.logToConsole = true;

const pusher = new Pusher(
  "REDACTED",
  {
    encrypted: true,
    authEndpoint: "http://127.0.0.1:5000/pusher/auth"
  }
);

const ch = pusher.subscribe("private-ch");

let sentRequest;
function time() {
  function reqListener() { console.log(this.responseText); }

  var req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("POST", "http://127.0.0.1:5000/pusher/trigger/time");
  sentRequest = Date.now();
  req.send();
}

ch.bind("time", ({ hitServer }) => {
  const now = Date.now();
  console.log(`It took ${hitServer - sentRequest}ms to hit the server and ${now - hitServer}ms to reveive the triggered event from Pusher.`);
});
