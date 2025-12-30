"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_js_1 = __importDefault(require("./routes/UserRouter.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(UserRouter_js_1.default);
exports.default = app;
