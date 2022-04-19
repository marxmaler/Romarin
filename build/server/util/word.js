"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNthRev = exports.getLtmsPoint = exports.getLanguageFromLang = exports.getlangFomLanguage = exports.stringToArray = exports.languages = void 0;
exports.languages = [
    "English",
    "Español",
    "Français",
    "Deutsch",
    "日本語",
    "中文",
    "Русский",
];
const stringToArray = (stringData) => {
    const array = stringData !== ""
        ? String(stringData)
            .split(",")
            .map((particle) => {
            const trimmedParticle = particle.trim();
            if (trimmedParticle.length > 0) {
                return trimmedParticle;
            }
        })
        : [];
    return array;
};
exports.stringToArray = stringToArray;
const getlangFomLanguage = (language) => {
    const statLang = language === "English"
        ? "En"
        : language === "Español"
            ? "Es"
            : language === "Français"
                ? "Fr"
                : language === "Deutsch"
                    ? "De"
                    : language === "日本語"
                        ? "Jp"
                        : language === "中文"
                            ? "Ch"
                            : "Ru";
    return statLang;
};
exports.getlangFomLanguage = getlangFomLanguage;
const getLanguageFromLang = (lang) => {
    const language = lang === "En"
        ? "English"
        : lang === "Es"
            ? "Español"
            : lang === "Fr"
                ? "Français"
                : lang === "De"
                    ? "Deutsch"
                    : lang === "Jp"
                        ? "日本語"
                        : lang === "Ch"
                            ? "中文"
                            : "Русский";
    return language;
};
exports.getLanguageFromLang = getLanguageFromLang;
const getLtmsPoint = ({ collocation, association, ex, syn, ant, }) => {
    let ltmsPoint = 0;
    ltmsPoint += collocation.length > 0 ? 10 : 0;
    ltmsPoint += association !== "" ? 50 : 0;
    ltmsPoint += ex !== "" ? 20 : 0;
    ltmsPoint += syn.length > 0 ? 10 : 0;
    ltmsPoint += ant.length > 0 ? 10 : 0;
    return ltmsPoint;
};
exports.getLtmsPoint = getLtmsPoint;
const getNthRev = (regRev) => {
    const nthRev = (regRev === null || regRev === void 0 ? void 0 : regRev.length) === 4
        ? "never"
        : (regRev === null || regRev === void 0 ? void 0 : regRev.length) === 3
            ? "once"
            : (regRev === null || regRev === void 0 ? void 0 : regRev.length) === 2
                ? "twice"
                : (regRev === null || regRev === void 0 ? void 0 : regRev.length) === 1
                    ? "threeTimes"
                    : "fourTimes";
    return nthRev;
};
exports.getNthRev = getNthRev;
