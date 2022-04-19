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
exports.putWords = exports.patchGradedWords = exports.postWord = exports.getWeeklyWords = exports.getMatchedWords = exports.getWords = void 0;
const time_1 = require("../util/time");
const word_1 = require("../util/word");
const User_1 = __importDefault(require("../models/User"));
const Word_1 = __importDefault(require("../models/Word"));
// GET Methods
const getWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date(req.params.date);
    const userId = req.params.userId;
    const words = userId
        ? yield Word_1.default.find({
            user: userId,
            $or: [
                {
                    regRev: { $lte: today },
                },
                { wrong: true },
            ],
        })
        : [];
    return res.status(200).send({ words });
});
exports.getWords = getWords;
const getMatchedWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, langNum, query, queryBasis } = req.params;
    const language = Number(langNum) === 0 ? null : word_1.languages[Number(langNum) - 1];
    const filter = language
        ? {
            user: userId,
            language,
            [queryBasis]: { $regex: query },
        }
        : {
            user: userId,
            [queryBasis]: { $regex: query },
        };
    const words = userId ? yield Word_1.default.find(filter) : [];
    return res.status(200).send({ words });
});
exports.getMatchedWords = getMatchedWords;
const getWeeklyWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    // 이러지 말고 1주일 치 단어를 한꺼번에 find로 가져오기, 가져오고 addedAt으로 프론트 쪽에서 솎아도 됨
    const weeklyWords = yield Word_1.default.find({
        addedAt: { $gte: (0, time_1.getEightDaysAgo)(new Date(date)), $lte: new Date(date) },
    });
    // console.log(weeklyWords);
    // console.log(weeklyWords.length);
    return res.status(200).send({
        result: weeklyWords,
    });
});
exports.getWeeklyWords = getWeeklyWords;
// POST Methods
const postWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { today, language, data: { spelling: rawSpelling, pronunciation: rawPronunciation, meaning: rawMeaning, collocation: rawCol, association: rawAss, ex: rawEx, syn: rawSyn, ant: rawAnt, }, } = req.body;
    const userId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a._id;
    const [collocation, syn, ant] = [rawCol, rawSyn, rawAnt].map((raw) => (0, word_1.stringToArray)(raw));
    const [spelling, pronunciation, meaning, association, ex] = [
        rawSpelling,
        rawPronunciation,
        rawMeaning,
        rawAss,
        rawEx,
    ].map((raw) => raw.trim());
    const ltmsPoint = (0, word_1.getLtmsPoint)({ collocation, association, ex, syn, ant });
    const regRev = (0, time_1.getRegRev)(new Date(today));
    const addedAt = (0, time_1.getZeroTime)(new Date(today));
    const newWord = yield Word_1.default.create({
        user: userId,
        language,
        spelling,
        pronunciation,
        meaning,
        collocation,
        association,
        ex,
        syn,
        ant,
        regRev,
        ltmsPoint,
        addedAt,
    });
    const user = yield User_1.default.findById(userId);
    if (user) {
        const statLang = (0, word_1.getlangFomLanguage)(language);
        user.stat[statLang].total += 1;
    }
    user === null || user === void 0 ? void 0 : user.save();
    console.log(newWord);
    return res.sendStatus(200);
});
exports.postWord = postWord;
// PATCH Methods
const patchGradedWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const testResults = req.body;
    for (let i = 0; i < testResults.length; i++) {
        const { wordId, wrong } = testResults[i];
        const word = yield Word_1.default.findById(wordId);
        if (word && wrong) {
            //문제를 틀렸음
            word.wrong = wrong;
        }
        else if (word && !wrong) {
            //문제를 맞췄음
            if (word.wrong) {
                //이미 틀린 적 있는 단어일 때
                word.wrong = wrong;
            }
            else {
                console.log(`${word.spelling}의 regRev:${word.regRev}`);
                (_b = word.regRev) === null || _b === void 0 ? void 0 : _b.splice(0, 1);
                console.log(`${word.spelling}의 regRev:${word.regRev}`);
                const nthRev = (0, word_1.getNthRev)(word.regRev);
                console.log("nthRev:", nthRev);
                const statLang = (0, word_1.getlangFomLanguage)(word.language);
                const user = yield User_1.default.findById(word.user);
                console.log("조작 전:", user === null || user === void 0 ? void 0 : user.stat[statLang]);
                if (user) {
                    if (nthRev === "twice" ||
                        nthRev === "threeTimes" ||
                        nthRev === "fourTimes") {
                        nthRev === "twice"
                            ? (user.stat[statLang].once -= 1)
                            : nthRev === "threeTimes"
                                ? (user.stat[statLang].twice -= 1)
                                : nthRev === "fourTimes"
                                    ? (user.stat[statLang].threeTimes -= 1)
                                    : null;
                    }
                    if (nthRev !== "never") {
                        user.stat[statLang][nthRev] += 1;
                        yield user.save();
                    }
                }
                console.log("조작 후:", user === null || user === void 0 ? void 0 : user.stat[statLang]);
            }
        }
        word === null || word === void 0 ? void 0 : word.save();
        if (((_c = word === null || word === void 0 ? void 0 : word.regRev) === null || _c === void 0 ? void 0 : _c.length) === 0) {
            yield Word_1.default.deleteOne({ _id: word._id });
        }
    }
    // console.log(word);
    return res.sendStatus(200);
});
exports.patchGradedWords = patchGradedWords;
// PUT Methods
const putWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { language, spelling: rawSpelling, pronunciation: rawPronunciation, meaning: rawMeaning, collocation: rawCol, association: rawAss, ex: rawEx, syn: rawSyn, ant: rawAnt, }, wordId, } = req.body;
    const [collocation, syn, ant] = [rawCol, rawSyn, rawAnt].map((raw) => (0, word_1.stringToArray)(raw));
    const [spelling, pronunciation, meaning, association, ex] = [
        rawSpelling,
        rawPronunciation,
        rawMeaning,
        rawAss,
        rawEx,
    ].map((raw) => raw.trim());
    const ltmsPoint = (0, word_1.getLtmsPoint)({ collocation, association, ex, syn, ant });
    const oldWord = yield Word_1.default.findById(wordId);
    const oldLanguage = oldWord === null || oldWord === void 0 ? void 0 : oldWord.language;
    const updatedWord = yield Word_1.default.findByIdAndUpdate(wordId, {
        language,
        spelling,
        pronunciation,
        meaning,
        collocation,
        association,
        ex,
        syn,
        ant,
        ltmsPoint,
    }, { new: true });
    if (updatedWord && oldLanguage && oldLanguage !== language) {
        const user = yield User_1.default.findById(updatedWord === null || updatedWord === void 0 ? void 0 : updatedWord.user);
        const nthRev = (0, word_1.getNthRev)(updatedWord.regRev);
        const oldStatLang = (0, word_1.getlangFomLanguage)(oldLanguage);
        const newStatLang = (0, word_1.getlangFomLanguage)(updatedWord.language);
        if (user) {
            if (nthRev === "once" || nthRev === "twice" || nthRev === "threeTimes") {
                user.stat[oldStatLang][nthRev] -= 1;
                user.stat[newStatLang][nthRev] += 1;
            }
            user.stat[oldStatLang].total -= 1;
            user.stat[newStatLang].total += 1;
        }
        user === null || user === void 0 ? void 0 : user.save();
    }
    console.log(updatedWord);
    return res.status(200).send({ word: updatedWord });
});
exports.putWords = putWords;
