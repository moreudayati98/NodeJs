const myPool = require('./pool');

function sendDataToFreeWorker(data) {
    //generated dummyjobid 
    //we must have a job id in order to get a free worker because we'll assign jobid to the process object so that when a process memory exceeds we'll need to get a jobid from the process that is being executed
    const jobid = `job${data}Id`;
    const worker = myPool.getFreeWorker(jobid);
    if (worker != null && worker.stdin != null)
        worker.stdin.write(data.toString());
    console.log("NO FREE PROCESS");
}
process.stdin.on('data', (ele) => {
    sendDataToFreeWorker(ele);
})

module.exports = { sendDataToFreeWorker }
