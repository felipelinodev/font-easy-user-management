"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerDelete = userControllerDelete;
exports.userControllerCreate = userControllerCreate;
exports.userControllerLogin = userControllerLogin;
exports.userControllerProfile = userControllerProfile;
exports.userControllerUpdate = userControllerUpdate;
exports.userGoogleControllerCreate = userGoogleControllerCreate;
exports.userGoogleControllerLogin = userGoogleControllerLogin;
const UserDao_1 = require("../database/UserDao");
const zod_1 = require("zod");
const UserSchema_1 = require("../schemas/UserSchema");
const security_1 = require("../services/security");
const auth_1 = require("../services/auth");
async function userControllerCreate(req, res) {
    const user = UserSchema_1.userSchemaZod.safeParse(req.body);
    if (!user.success) {
        return res.status(400).json({ erros: zod_1.z.flattenError(user.error) });
    }
    user.data.password = await (0, security_1.generateHash)(user.data.password);
    await (0, UserDao_1.userCreate)(user.data);
    res.status(201).json({ message: "usuario criado com sucesso!", user });
}
async function userGoogleControllerCreate(req, res) {
    const googleUser = UserSchema_1.userGoogleSchemaZod.safeParse(req.body);
    if (!googleUser.success) {
        return res.status(400).json({ erros: zod_1.z.flattenError(googleUser.error) });
    }
    await (0, UserDao_1.userGoogleCreate)(googleUser.data);
    res.status(201).json({ message: "usuario criado com sucesso!", googleUser });
}
async function userGoogleControllerLogin(req, res) {
    const { google_id } = req.body;
    if (!google_id) {
        return res.status(400).json({ errors: 'google_id é obrigatório' });
    }
    const userGoogle = await (0, UserDao_1.userGoogleLogin)(google_id);
    if (!userGoogle) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    const tokenAuth = (0, auth_1.generateToken)(userGoogle.id);
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('font-easy-auth', tokenAuth, {
        httpOnly: true, //Esse cookie não vai ser acessivel do lado do cliente.
        secure: isProd, // Em produção é true com https
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        path: '/',
        domain: isProd ? process.env.DOMAIN : 'localhost'
    });
    res.status(200).json({ message: "Login realizado com sucesso." });
}
async function userControllerLogin(req, res) {
    const user = UserSchema_1.loginSchemaZod.safeParse(req.body);
    if (!user.success) {
        return res.status(400).json({ erros: zod_1.z.flattenError(user.error) });
    }
    const loginData = await (0, UserDao_1.userLogin)(user.data);
    if (!loginData) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const tokenAuth = (0, auth_1.generateToken)(loginData.id);
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('font-easy-auth', tokenAuth, {
        httpOnly: true, //Esse cookie não vai ser acessivel do lado do cliente.
        secure: isProd, // Em produção é true com https
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        path: '/',
        domain: isProd ? process.env.DOMAIN : 'localhost'
    });
    res.status(200).json({ message: "Login realizado com sucesso." });
}
async function userControllerProfile(req, res) {
    const { userId } = req.body.user;
    const user = await (0, UserDao_1.userGetById)(userId);
    if (!user) {
        return res.status(404).json({ error: "usuário não encontrado." });
    }
    res.status(200).json({ user });
}
async function userControllerUpdate(req, res) {
    const { userId } = req.body.user;
    const { user, ...dataUpdate } = req.body;
    try {
        const updated = await (0, UserDao_1.userUpdate)(userId, dataUpdate);
        res.status(200).json({ message: "Usuário atualizado com sucesso.", data: updated });
    }
    catch (error) {
        return res.status(404).json({ error: "usuario não encontrado ou token invalido." });
    }
}
async function userControllerDelete(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    await (0, UserDao_1.userDelete)(id);
    res.status(200).json({ message: "usuario deletado com sucesso!" });
}
