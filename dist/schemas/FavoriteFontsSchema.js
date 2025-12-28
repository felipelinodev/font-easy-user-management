"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontSchemaZod = void 0;
const zod_1 = require("zod");
const fontSchemaZod = zod_1.z.object({
    font_name: zod_1.z.string().min(1, "A font precisa ter um nome"),
    font_variations: zod_1.z.number().optional(),
    font_type: zod_1.z.string().optional(),
    fontlinks: zod_1.z.array(zod_1.z.object({
        fontLink: zod_1.z.url("Link inválido")
    })).optional()
});
exports.fontSchemaZod = fontSchemaZod;
