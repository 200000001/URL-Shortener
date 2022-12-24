// mongoDB 접속
// dotenv로 환경변수 가져옴

import * as express from 'express'
import { Application } from 'express'
import * as mongoose from 'mongoose';
import 'dotenv/config';


class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express()
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.assets()
        this.template()
        this.port = appInit.port
        this.initDatabase()

    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private initDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env

        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
        
            .then(() => console.log('MongoDB successfully Connected'))
            .catch(err => console.log(err))
    }

    private assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static('views'))
    }

    private template() {
        this.app.set('view engine', 'pug')
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`link ->  http://localhost:${this.port}`)
        })
    }
}

export default App
