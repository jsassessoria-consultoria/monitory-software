const { spawn } = require('child_process');
const globals = require('../../config/globals')

function uninstallService(){
    return new Promise((resolve, reject) => {
        const uninstall = spawn(`cd ${globals.__deployAbsolutePath()} && cmd.exe`, ['/c',
            'schtasks',
            '/delete',
            '/tn',
            globals.__serviceName,
            '/f'
        ], { shell: 'cmd.exe'})

       uninstall.stdout.on('data', (data) => {
        console.log(String(data))
         resolve(data)
       })
   
       uninstall.stderr.on('data', (e) => {
        console.log('Erro na desinstalação do serviço', String(e))
        reject(e)
       })
    })
}

uninstallService();