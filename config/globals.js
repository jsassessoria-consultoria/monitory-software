const path = require('path')
const dotenv = require('dotenv')
const dotenvExp = require('dotenv-expand')

const env = dotenv.config({
    path: path.join(path.dirname(__dirname),'.env.production')
});
dotenvExp.expand(env)

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
    __local_url: function() {
        return process.env.LOCAL_URL
    }
}