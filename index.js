const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes');
const methodOverride = require('method-override')
const path = require('path');
const { port } = require('./config/system-config')
class App {
    constructor() {
        this.expressApp = express();
        this.configs = {
            get port() {
                return process.env.PORT || port;
            }
        }
    }

    applyMiddleware() {
        this.expressApp.set('port', this.configs.port)
        this.expressApp.set('views', path.join(__dirname, 'views'))
        this.expressApp.set('view engine', 'pug')
        this.expressApp.use(methodOverride())
        this.expressApp.use(bodyParser.json())
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(express.static(path.join(__dirname, 'public')));

        new Routes(this.expressApp);
    }
    run() {
        this.expressApp.listen(this.expressApp.get('port'), () => {
            console.log(`Express Server running : http://localhost:${this.expressApp.get('port')}/`);
        })
    }
}
const app = new App();
app.applyMiddleware();
app.run();