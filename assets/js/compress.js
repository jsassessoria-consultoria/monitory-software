const adminZip = require('adm-zip');
const path = require('path')
const globals = require('../../config/globals')

console.log(globals.__localZipPath())

async function zipFolder(folderPath) {
    return new Promise((resolve, reject) => {
        try {
            const zip = new adminZip();
            // Compacta a pasta inteira e seu conteúdo
            zip.addLocalFolder(folderPath);
            zip.writeZip(globals.__localZipPath());
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

(async function() {
    try {
        await zipFolder(path.join(globals.__localAbsolutePath(), 'build'));
        console.log('Folder added to zip successfully');
    } catch (err) {
        console.error(err);
    }
})();

