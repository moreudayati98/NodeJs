var WebSocket = require('ws')
let ws = null;

function openConn() {

  ws = new WebSocket(`ws://localhost:8083`);
  ws.onopen = () => {
    console.log("onopen called");

    let msg = { msg: "browser websocket" }
    let msgString = JSON.stringify(msg)
    ws.send(msgString)

    /* Ping the connected endpoint every 15 seconds to keep connection alive */
    interval = setInterval(function ping() {

      if (ws.isAlive === false) return ws.terminate();
      if (ws.readyState === 0) return;

      console.debug(`Pinging clients every 15 seconds to keep connection alive...`)
      ws.send(JSON.stringify({ msg: 'ping' }));
      ws.isAlive = true;
    }, 15000);
  }

  ws.onmessage = (evt) => {
    console.log("onmessage called")
    let incomingMsg = evt.data
    lastPayload = incomingMsg
    console.log(incomingMsg)
    let json = null;
    try {
      json = JSON.parse(incomingMsg)
    } catch (err) {
      console.error('Possible Payload Parse Error : payload could be null or empty . Ignore this error if sent purposefully.')
      console.error(err)
    }
  }

  ws.onclose = () => {
    console.log("onclose called")
    console.debug("WS Connection Closed");
    console.log("OPening again");
    openConn();
  }
}


openConn();


