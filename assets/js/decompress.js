const fs = require('fs');
const path = require('path')
const adminZip = require('adm-zip');
const { spawn } = require('child_process');

const globals = require('../../config/globals')


const zip = new adminZip(globals.__localZipPath())

async function createFolders(){
    console.log('Criando as pastas...')
    return await fs.promises.mkdir(globals.__deployAbsolutePath(), { recursive: true} , err => {
        if(err) console.log('Erro na criação de pastas', err)
    })
}


async function extractZip(){
    console.log('Extraindo arquivos...')
    return new Promise((resolve, reject) => {
        zip.extractAllToAsync(globals.__deployAbsolutePath(), true, false, (err) => {
            if(err) {
                console.log(err)
                reject(err);
            }
            resolve();
        })

    })
}

function installService(){
    console.log('Iniciando o serviço...')
    return new Promise((resolve, reject) => {
        const executable = spawn(`cd ${globals.__deployAbsolutePath()} && cmd.exe`, ['/c',
        'service-install.exe',
        ], { shell: 'cmd.exe'})

        executable.stdout.on('data', (data) => {
         console.log(String(data))
         resolve(data)
       })
   
       executable.stderr.on('data', (e) => {
           console.log('Erro na desinstalação do serviço', String(e))
           reject(e)
       })
    })
}


//TODOS: Fazer verificaçoes
if(process.env.ProgramData){
    initDescompres()
}


async function initDescompres(){
    await createFolders();
    await extractZip();
    await installService();
}
