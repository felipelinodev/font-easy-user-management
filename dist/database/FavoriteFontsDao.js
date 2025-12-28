"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteFontsCreate = favoriteFontsCreate;
exports.favoritefontsDelete = favoritefontsDelete;
exports.GetAllfavoriteFontsByUser = GetAllfavoriteFontsByUser;
exports.getFavoriteFontsById = getFavoriteFontsById;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function favoriteFontsCreate(data) {
    return prisma_1.default.favoritefonts.create({
        data: {
            user_id: data.user_id,
            font_name: data.font_name,
            font_variations: data.font_variations,
            font_type: data.font_type,
            fontlinks: {
                create: data.fontlinks?.map(link => ({
                    font_link: link.fontLink
                })) ?? []
            }
        },
        include: { fontlinks: true }
    });
}
async function favoritefontsDelete(idFont) {
    return prisma_1.default.favoritefonts.delete({
        where: { id_font: idFont }
    });
}
async function GetAllfavoriteFontsByUser(userId) {
    return prisma_1.default.favoritefonts.findMany({
        where: { user_id: userId },
        include: { fontlinks: true }
    });
}
async function getFavoriteFontsById(idFont) {
    return prisma_1.default.favoritefonts.findUnique({
        where: { id_font: idFont }
    });
}
