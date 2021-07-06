const fs = require('fs'),
    path = require('path'),
    {NodeSSH} = require('node-ssh');

const arguments = process.argv.slice(2);

if(arguments.length < 3)
    throw new Error('Not enough arguments passed. You should specify: user host path_to_privatekey');

const ssh = new NodeSSH();

(async () => {
    try {
        await ssh.connect({
            host: arguments[1],
            username: arguments[0],
            port: 9922,
            privateKey: fs.readFileSync(arguments[2], 'utf8')
        });
    }catch(err){
        console.log(`Error occurred`, err);
    }

    try {
        await ssh.execCommand("touch test.txt", {cwd: '/srv', stream: 'stdout'});
    }catch(e){
        console.log(`Error occurred`, e);
    }

    ssh.dispose();
})();
