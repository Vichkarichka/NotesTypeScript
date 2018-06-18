import * as bodyParser from "body-parser";
import * as express from "express";

class App {

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public app: express.Application;

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.app.use('/', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Methods", "*");

            if (req.method !== "OPTIONS") {
                next();
            }
            if (req.method === "OPTIONS") {
                res.send();
            }
        });

    }

}

export default new App().app;