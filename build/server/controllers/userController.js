"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGithubAuthLogin = exports.getGithubLogin = exports.getUser = exports.postJoin = exports.getLogout = exports.postLogin = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const url_1 = require("url");
const node_fetch_1 = __importDefault(require("node-fetch"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { email, password }, } = req.body;
    const user = yield User_1.default.findOne({ email, socialOnly: false });
    if (!user) {
        return res.sendStatus(404);
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        return res.sendStatus(400);
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).send({ user });
});
exports.postLogin = postLogin;
const getLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        return res.sendStatus(200);
    });
});
exports.getLogout = getLogout;
const postJoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { email, password, name }, } = req.body;
    const emailExist = yield User_1.default.exists({ email });
    if (emailExist) {
        return res.sendStatus(400);
    }
    const newUser = yield User_1.default.create({
        email,
        name,
        password,
    });
    console.log(newUser);
    return res.sendStatus(200);
});
exports.postJoin = postJoin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield User_1.default.findById(userId);
    if (!user) {
        return res.sendStatus(404);
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).send({ user });
});
exports.getUser = getUser;
const getGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT + "",
        scope: "read:user user:email",
        allow_signup: false + "", //전부 String으로 바꿔줘야 URLSearchParams에서 안막힘
    };
    const params = new url_1.URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.status(200).send({ finalUrl });
};
exports.getGithubLogin = getGithubLogin;
const postGithubAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const codeStringSplits = req.body.code.split("code=");
    const code = codeStringSplits.length > 1 ? codeStringSplits[1] + "" : req.body.code + "";
    console.log("code:", code);
    const config = {
        client_id: process.env.GH_CLIENT + "",
        client_secret: process.env.GH_SECRET + "",
        code,
    };
    const params = new url_1.URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenData = (yield (yield (0, node_fetch_1.default)(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json());
    console.log(tokenData);
    if ("access_token" in tokenData) {
        const { access_token } = tokenData;
        const apiUrl = "https://api.github.com/user";
        const userData = (yield (yield (0, node_fetch_1.default)(apiUrl, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })).json());
        const emailData = (yield (yield (0, node_fetch_1.default)(`${apiUrl}/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })).json());
        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
        if (!emailObj) {
            return res.sendStatus(400);
        }
        let user = yield User_1.default.findOne({ email: emailObj.email });
        if (!user) {
            user = yield User_1.default.create({
                email: emailObj.email,
                name: userData.name,
                password: "",
                socialOnly: true,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        console.log(user);
        return res.status(200).send({ user });
    }
    else {
        // error: 'bad_verification_code',
        // error_description: 'The code passed is incorrect or expired.',
        // error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
        return res.sendStatus(400);
    }
});
exports.postGithubAuthLogin = postGithubAuthLogin;
