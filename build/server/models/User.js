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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, default: "" },
    socialOnly: { type: Boolean, default: false, required: true },
    stat: {
        En: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        Es: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        Fr: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        De: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        Jp: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        Ch: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
        Ru: {
            total: { type: Number, default: 0 },
            once: { type: Number, default: 0 },
            twice: { type: Number, default: 0 },
            threeTimes: { type: Number, default: 0 },
            fourTimes: { type: Number, default: 0 },
        },
    },
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcrypt_1.default.hash(this.password, 5);
        }
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
