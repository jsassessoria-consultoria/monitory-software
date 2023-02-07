const path = require('path')

module.exports = {
    __appName: 'ODSSauron',
    __serviceName: 'ODSSauron',
    __localAbsolutePath: function () {
        // C:\<User>\...\<diretorio principal>
        return path.dirname(__dirname)
    },
    __deployAbsolutePath: function() {
        // C:\ProgramData\<__appName>
        return process.env.ProgramData.concat(path.sep, this.__appName)
    },
    __localZipPath: function(){
        return path.join(this.__localAbsolutePath(),'assets/build.zip')
    },
}