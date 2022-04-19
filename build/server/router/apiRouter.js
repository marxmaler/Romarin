"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const wordController_1 = require("../controllers/wordController");
const middlewares_1 = require("../middlewares");
const apiRouter = express_1.default.Router();
apiRouter.route("/users/login").all(middlewares_1.mustNotLogin).post(userController_1.postLogin);
apiRouter
    .route("/users/login/github")
    .all(middlewares_1.mustNotLogin)
    .get(userController_1.getGithubLogin)
    .post(userController_1.postGithubAuthLogin);
apiRouter.route("/users/logout").all(middlewares_1.mustLogin).get(userController_1.getLogout);
apiRouter.route("/users/join").all(middlewares_1.mustNotLogin).post(userController_1.postJoin);
apiRouter.route("/users/:userId").all(middlewares_1.mustLogin).get(userController_1.getUser);
apiRouter
    .route("/words")
    .all(middlewares_1.mustLogin)
    .post(wordController_1.postWord)
    .put(wordController_1.putWords)
    .patch(wordController_1.patchGradedWords);
apiRouter.route("/words/weekly/:date").all(middlewares_1.mustLogin).get(wordController_1.getWeeklyWords);
apiRouter.route("/words/:userId/:date").all(middlewares_1.mustLogin).get(wordController_1.getWords);
apiRouter
    .route("/words/:userId/:langNum/:queryBasis/:query")
    .all(middlewares_1.mustLogin)
    .get(wordController_1.getMatchedWords);
exports.default = apiRouter;
