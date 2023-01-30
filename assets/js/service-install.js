const { exec } = require('child_process');
const globals = require('../../config/globals')

console.log(`${globals.__deployAbsolutePath()}`)
function installService(){
    return new Promise((resolve, reject) => {
        try{
            exec(`cd ${globals.__deployAbsolutePath()} && cmd.exe /c service-install.bat ${globals.__appName} ${globals.__serviceName}`, { }, (e, stdout) => {
                if(e) console.log('Deu erro')
                console.log(stdout)
            })
            resolve();
        }catch(err) {
            reject(err)
        }
    })
}

installService();