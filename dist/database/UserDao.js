"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreate = userCreate;
exports.userGoogleCreate = userGoogleCreate;
exports.userDelete = userDelete;
exports.userLogin = userLogin;
exports.userGetById = userGetById;
exports.userUpdate = userUpdate;
exports.userGoogleLogin = userGoogleLogin;
const prisma_1 = __importDefault(require("../lib/prisma"));
const security_1 = require("../services/security");
async function userCreate(data) {
    return prisma_1.default.users.create({ data });
}
async function userGoogleCreate(data) {
    return prisma_1.default.users.upsert({
        where: { email: data.email },
        update: {
            // Atualiza dados do Google se o usuário já existir
            google_id: data.google_id,
            name: data.name,
            photo: data.photo
        },
        create: data
    });
}
async function userGoogleLogin(google_id) {
    return prisma_1.default.users.findUnique({
        where: { google_id }
    });
}
async function userLogin(data) {
    const { email, password } = data;
    const user = await prisma_1.default.users.findUnique({
        where: { email }
    });
    if (!user) {
        return null;
    }
    if (!user.password) {
        return null;
    }
    const isValidPassword = await (0, security_1.compareHash)(password, user.password);
    if (!isValidPassword) {
        return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
async function userGetById(id) {
    return prisma_1.default.users.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, photo: true, plan_type: true }
    });
}
async function userUpdate(id, data) {
    return prisma_1.default.users.update({
        where: { id },
        data,
        select: { id: true, name: true, email: true, photo: true, plan_type: true }
    });
}
async function userDelete(id) {
    return prisma_1.default.users.delete({
        where: {
            id,
        }
    });
}
