const { max_child_processes, exe_name } = require('./config.json');
let ChildProcessWorker = require('./ChildProcessWorker');
const { createMonitorJob } = require('./cpMonitor');
class Pool {
    createNewWorker(exe_name) {
        let cpObj = new ChildProcessWorker(exe_name);
        let processKey = cpObj.cp.pid;
        console.log(`Creating child process ${processKey}`)
        this.pool.set(processKey, cpObj);
        let process = this.pool.get(processKey);

        process.cp.stdout.on('data', d => {
            console.log(`Data received from ${processKey}`);
            const data = d.toString();
            console.log(data)
            if (data === 'Finished') // Assumption: exe will send finished flag once job execution is finished
                process.setCpFree()
        });

        // Add a job to monitor the process memory
        createMonitorJob(processKey);
    }
    constructor(exe) {
        this.pool = new Map();
        for (let i = 1; i <= max_child_processes; i++) {
            this.createNewWorker(exe);
        }
    }

    getFreeWorker(jobId) {
        for (let [key, value] of this.pool) {
            console.log(`Checking if ${key} worker is free...`);
            if (value.isFree && value.jobid == null) {
                value.setCpBusy();
                value.setJobId(jobId);
                console.log(value.getJobId());
                return value.cp;
            } else console.log("It is busy");
        }
        return null;
    }
}

module.exports = new Pool(exe_name);

