"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wordSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, required: true },
    spelling: { type: String, required: true },
    pronunciation: { type: String, default: "" },
    meaning: { type: String, required: true },
    collocation: [{ type: String, default: [] }],
    association: { type: String, default: "" },
    ex: { type: String, default: "" },
    syn: [{ type: String, default: [] }],
    ant: [{ type: String, default: [] }],
    regRev: [{ type: Date, required: true }],
    wrong: { type: Boolean, default: false, required: true },
    ltmsPoint: { type: Number, default: 0, required: true },
    addedAt: { type: Date, required: true },
});
const Word = (0, mongoose_1.model)("Word", wordSchema);
exports.default = Word;
