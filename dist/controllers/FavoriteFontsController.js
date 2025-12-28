"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontsControllerCreate = fontsControllerCreate;
exports.getAllFavoriteFontsController = getAllFavoriteFontsController;
exports.favoriteFontsControllerDelete = favoriteFontsControllerDelete;
const zod_1 = require("zod");
const FavoriteFontsSchema_1 = require("../schemas/FavoriteFontsSchema");
const FavoriteFontsDao_1 = require("../database/FavoriteFontsDao");
async function fontsControllerCreate(req, res) {
    const font = FavoriteFontsSchema_1.fontSchemaZod.safeParse(req.body);
    if (!font.success) {
        return res.status(400).json({ errors: zod_1.z.flattenError(font.error) });
    }
    const userId = req.user.id;
    await (0, FavoriteFontsDao_1.favoriteFontsCreate)({
        ...font.data,
        user_id: userId
    });
    return res.status(201).json({ message: "font adicionada sucesso!", font });
}
async function getAllFavoriteFontsController(req, res) {
    const userId = req.user.id;
    const all_fonts = await (0, FavoriteFontsDao_1.GetAllfavoriteFontsByUser)(userId);
    return res.status(200).json(all_fonts);
}
async function favoriteFontsControllerDelete(req, res) {
    const idFont = Number(req.params.id);
    if (isNaN(idFont)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    await (0, FavoriteFontsDao_1.favoritefontsDelete)(idFont);
    return res.status(200).json({ message: "font deletada com sucesso." });
}
