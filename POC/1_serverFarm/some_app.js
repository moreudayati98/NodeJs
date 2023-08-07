process.stdin.on('data', function (chunk) {
    process.stdout.write(' Process sent ' + chunk.toString());
    setTimeout(() => {
        console.log(`Finished`);
    }, 30000)
});