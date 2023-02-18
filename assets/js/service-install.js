const { spawn } = require('child_process');
const globals = require('../../config/globals')

function installService(){
    return new Promise((resolve, reject) => {
            const install = spawn(`cd ${globals.__deployAbsolutePath()} && cmd.exe`, ['/c',
             'service-install.bat',
             globals.__appName,
             globals.__serviceName,
             globals.__local_url()
            ], { shell: 'cmd.exe'})
            install.stdout.on('data', (data) => {
              console.log(String(data))
              resolve(data)
            })
        
            install.stderr.on('data', (e) => {
                console.log('Erro na instalação do serviço', String(e))
                reject(e)

            })
    })
}

installService();