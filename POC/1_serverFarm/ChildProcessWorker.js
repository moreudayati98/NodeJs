const childProcess = require('child_process');
class ChildProcessWorker {
    constructor(exe) {
        this.isFree = true;
        this.jobid = null;
        this.cp = childProcess.spawn(exe,
            {
                stdio: [
                    1,
                    'pipe' // Pipe child's stdout to parent.

                ]
            })
    }
    setCpBusy() {
        this.isFree = false;
    }
    setCpFree() {
        this.isFree = true
    }
    getPid() {
        return this.cp.pid;
    }
    getJobId() {
        return this.jobid;
    }
    setJobId(id) {
        this.jobid = id;
    }
}

module.exports = ChildProcessWorker;