var WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8083 })
console.log('websocket server started ')
let intervals = null;
function heyb() {
    console.log("heyb");
}
heyb();
wss.on('connection', function connection(ws) {
    console.log('websocket connection established ')
    ws.on('message', function incoming(message) {
        console.log(message);
        sendMsg()

    });

    ws.onclose = function (e) {
        console.log("connection closed")
        clearInterval(intervals)
        intervals = null;
    };

    var sendMsg = function () {
        console.log("sending msg ");
        ws.send(JSON.stringify({ "Data": [{ "CountingInfo": [{ "In": 1, "Out": 0 }] }] }));
    }
    intervals = setInterval(sendMsg, 14000);
});
