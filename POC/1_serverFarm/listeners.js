const childObjMap = require('./mapStore');

let listener = function () {
    let p1 = childObjMap.childObjMap.get('process1');
    let p2 = childObjMap.childObjMap.get('process2');
    console.log(p1.pid);// Prints process id of spawned process with exe 1
    console.log(p2.pid);// Prints process id of spawned process with exe 2

    // To get output from child process' standard output we capture stdout 
    p1.stdout.on('data', d => {
        console.log("Data received 1")
        console.log(d.toString())
    });
    p2.stdout.on('data', d => {
        console.log("Data received 2")
        console.log(d.toString())
    });

    p1.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    p2.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    // Give input to process
    p1.stdin.write('Hi111');
    p2.stdin.write("Helloo3333");
    p1.stdin.write('Hi2444');
    p1.stdin.end();
    p2.stdin.end();
}


module.exports = { listener }