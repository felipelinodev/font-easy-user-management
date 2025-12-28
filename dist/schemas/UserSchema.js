"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGoogleSchemaZod = exports.loginSchemaZod = exports.userSchemaZod = void 0;
const zod_1 = require("zod");
const loginSchemaZod = zod_1.z.object({
    email: zod_1.z.email("Email inválido."),
    password: zod_1.z.string(),
});
exports.loginSchemaZod = loginSchemaZod;
const userSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "É necessário adicionar um nome."),
    email: zod_1.z.email("Email inválido."),
    password: zod_1.z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    photo: zod_1.z.url().optional().default("minhafoto.com"),
    plan_type: zod_1.z.string().optional().default("FREE")
});
exports.userSchemaZod = userSchemaZod;
const userGoogleSchemaZod = zod_1.z.object({
    name: zod_1.z.string().min(1, "É necessário adicionar um nome."),
    email: zod_1.z.email("Email inválido."),
    password: zod_1.z.string().optional(),
    google_id: zod_1.z.string('Id inválido.'),
    photo: zod_1.z.url().optional(),
    plan_type: zod_1.z.string().optional().default("FREE")
});
exports.userGoogleSchemaZod = userGoogleSchemaZod;
