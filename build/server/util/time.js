"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegRev = exports.getAMonthLater = exports.getAWeekLater = exports.getTomorrow = exports.getEightDaysAgo = exports.yyyymmdd = exports.getZeroTime = void 0;
function timeFormat(time) {
    return String(time).padStart(2, "0");
}
function getZeroTime(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const zerofiedDate = `${year}-${timeFormat(month)}-${timeFormat(date)}`;
    return new Date(zerofiedDate);
}
exports.getZeroTime = getZeroTime;
function yyyymmdd(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const formattedDate = `${year}-${timeFormat(month)}-${timeFormat(date)}`;
    return formattedDate;
}
exports.yyyymmdd = yyyymmdd;
function getEightDaysAgo(dateObj) {
    const aWeekAgo = new Date(dateObj);
    aWeekAgo.setDate(aWeekAgo.getDate() - 8);
    return aWeekAgo;
}
exports.getEightDaysAgo = getEightDaysAgo;
function getTomorrow(dateObj) {
    const tomorrow = new Date(dateObj);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}
exports.getTomorrow = getTomorrow;
function getAWeekLater(dateObj) {
    const aWeekLater = new Date(dateObj);
    aWeekLater.setDate(aWeekLater.getDate() + 7);
    return aWeekLater;
}
exports.getAWeekLater = getAWeekLater;
function getAMonthLater(dateObj) {
    const aMonthLater = new Date(dateObj);
    aMonthLater.setDate(aMonthLater.getDate() + 30);
    return aMonthLater;
}
exports.getAMonthLater = getAMonthLater;
function getRegRev(dateObj) {
    const today = getZeroTime(dateObj);
    const tomorrow = getTomorrow(today);
    const nextWeek = getAWeekLater(today);
    const nextMonth = getAMonthLater(today);
    const regRev = [today, tomorrow, nextWeek, nextMonth];
    return regRev;
}
exports.getRegRev = getRegRev;
