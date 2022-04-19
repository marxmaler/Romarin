"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustNotLogin = exports.mustLogin = void 0;
const mustLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }
    else {
        return res.sendStatus(401);
    }
};
exports.mustLogin = mustLogin;
const mustNotLogin = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }
    else {
        return res.status(401).send({ user: req.session.user }); //Unauthorized
    }
};
exports.mustNotLogin = mustNotLogin;
