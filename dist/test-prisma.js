"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./lib/prisma"));
async function criarUsuario() {
    const user = await prisma_1.default.users.create({
        data: {
            name: 'João Silva',
            email: 'joao@email.com',
            password: '123456'
        }
    });
    console.log('✅ Usuário criado:', user);
}
criarUsuario();
