const path = require('path')
const dotenv = require('dotenv')
const dotenvExp = require('dotenv-expand')


module.exports = {
    setEnv: () => {
        console.log(path.join(path.dirname(__dirname),'.env'))
        const env = dotenv.config({
            path: path.join(path.dirname(__dirname),'.env')
        });
        dotenvExp.expand(env)
    }
}
 