const mqtt = require('mqtt')
const logger = require('./logger')('app.js');
const host = "localhost";
const port = 1883;
const subscribeToTopic = "metric/count/update";
logger.info(`Starting mqtt connection to ${host}:${port}`);
const client = mqtt.connect(`mqtt://${host}:${port}`);

client.on('connect', function () {
    logger.info(`Connected!`);
    client.subscribe(subscribeToTopic, function (err) {
        if (err) {
            logger.error(`Error occured while subscribing to ${subscribeToTopic} ${err}`);
        } else logger.info(`Subscribbed to the topic ${subscribeToTopic}`);
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    logger.info(`Message received ${message.toString()}`);
})

client.on('error', function (er) {
    logger.error(`On error received ${er}`);
})

client.on('close', function () {
    logger.info(`On closed received`);
})