const { exec } = require('child_process');
const globals = require('../../config/globals')

function uninstallService(){
    return new Promise((resolve, reject) => {
        try{
            exec(`cd ${globals.__deployAbsolutePath()} && cmd.exe /c service-uninstall.bat ${globals.__serviceName}`, { }, (e, stdout) => {
                if(e) console.log('Deu erro')
                console.log(stdout)
            })
            resolve();
        }catch(err) {
            reject(err)
        }
    })
}

uninstallService();