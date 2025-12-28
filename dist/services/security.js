"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
exports.compareHash = compareHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function generateHash(password) {
    const salt = 10;
    return await bcrypt_1.default.hash(password, salt);
}
async function compareHash(password, hash) {
    return await bcrypt_1.default.compare(password, hash);
}
