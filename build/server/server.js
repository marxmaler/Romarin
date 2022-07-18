"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./db");
require("./models/Word");
require("./models/User");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const apiRouter_1 = __importDefault(require("./router/apiRouter"));
const app = (0, express_1.default)();
const buildAddress = path_1.default.join(__dirname, "..", "..", "client/build/");
// console.log("current directory:", __dirname);
//전역 middleware 선언부
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET + "",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.DB_URL }),
}));
app.use("/api", apiRouter_1.default);
app.use(express_1.default.static(buildAddress));
app.get("*", (req, res) => {
    return res.sendFile(buildAddress + "index.html");
});
app.listen(process.env.PORT, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 4000🛡️
  ################################################
`);
});
