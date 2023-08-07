const ws = require('ws')
let isOpen = null
const port = 8081
const url = `ws://localhost:${port}`
const logger = require('./logger')('app.js');

function connect() {
  const client = new ws(url)
  return new Promise((resolve, reject) => {
    logger.info('client try to connect...')

    client.on('open', () => {
      logger.info('WEBSOCKET_OPEN: client connected to server at port ' + port)
      isOpen = true
      /* Ping the connected endpoint every 15 seconds to keep connection alive */
      interval = setInterval(function ping() {

        if (client.isAlive === false) return client.terminate();
        if (client.readyState === 0) return;

        console.debug(`Pinging clients every 15 seconds to keep connection alive...`)
        client.send(JSON.stringify({ msg: 'ping' }));
        client.isAlive = true;
      }, 15000);

      resolve(isOpen)
    })

    client.on('message', (data) => {
      logger.info(data.toString())
    })

    client.on('close', (err) => {
      logger.info('WEBSOCKET_CLOSE: connection closed ' + err)
      isOpen = false
      reject(err)
    })

    client.on('error', (err) => {
      logger.error('WEBSOCKET_ERROR: Error ' + new Error(err.message))
      isOpen = false
      reject(err)
    })
  })
}

async function reconnect() {
  try {
    await connect()
  } catch (err) {
    logger.info('WEBSOCKET_RECONNECT: Error ' + new Error(err).message)
  }
}

reconnect()

// repeat every 5 seconds
setInterval(() => {
  if (!isOpen) {
    reconnect()
  }
}, 5000)
