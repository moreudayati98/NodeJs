

const { exec } = require('child_process');

const schedule = require('node-schedule');
const threshold = 200;

function killJobExecutingProcess(pid) {
    var myPoolObj = require('./pool');
    if (pid) {
        var myPool = myPoolObj.pool;
        const jobProcessObj = myPool.get(pid);
        console.log(`Process with pid ${pid} will be killed`);
        //we'll store this job id temporarily so that we can get job details from keystore and pass this job to new process 
        const jobId = jobProcessObj.getJobId();
        jobProcessObj.cp.kill();// kill the process
        myPool.delete(pid);//remove the entry from pool
        //-------------------------------------working till here------------------------
        myPoolObj.createNewWorker("./some_app_executable");//create new process in worker
        //TODO : Goto keystore and get the job description by jobid we stored above in this func.//here we're sending dummy data to process
        const dummydata = 'Udayati More';
        //TODO : pass the job description to the newly created process. Herre we're sending dummy data
        // const jobid = `job${dummydata}Id`;
        // const worker = myPoolObj.getFreeWorker(jobid);
        // if (worker != null && worker.stdin != null)
        //     worker.stdin.write(dummydata.toString());
        // console.log("NO FREE PROCESS");
    }
}
/**
 * createMonitor must be called in two cases 
 * 1 For each process eing spawned at the start of wrapper
 * 2 Whenever a process dies/closes/errored/restarted we must cancel the existing job and start the job with new pid
 * @param {} pid
 */
function execute(pid) {

    console.log(`Processing job after every Minute`);
    exec(`cat /proc/${pid}/smaps | grep -i pss |  awk '{Total+=$2} END {print Total}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;//TODO create new process and assign job of process id that is in pool
        }
        console.log(`Pid ${pid} Memory usage ${stdout}`);
        console.log(`Checking if memory usage is in the limit of threshold...`);
        if (stdout > threshold) {
            //stop the process monitoring job with this pid and take the process from memory, note the jobid that process was processing and call kill method .
            //Using the noted jobid we'll take job description from keystore and find new process and pass the job for processing.
            stopMonitorJob(pid);
            killJobExecutingProcess(pid);
        }
    });

}


function createMonitorJob(pid) {
    const jobId = `j_${pid}`;
    console.log(`Creating job for ${pid}`)
    schedule.scheduleJob(jobId, '* * * * *', function () {
        execute(pid)
    });

    return schedule;
}

function stopMonitorJob(pid) {

    let jobId = `j_${pid}`;
    let job = schedule.scheduledJobs[jobId];
    job.cancel();
    console.log(`stopped the monitoring job with pid ${pid}`);
}

module.exports = { createMonitorJob, stopMonitorJob }