"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const shortener_controller_1 = require("./controllers/shortener/shortener.controller");
const app = new app_1.default({
    port: 5000,
    controllers: [
        new shortener_controller_1.default()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
});
app.listen();
//# sourceMappingURL=server.js.map