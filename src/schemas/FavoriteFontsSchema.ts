import { z } from "zod";


const fontSchemaZod = z.object({
    font_name: z.string().min(1, "A font precisa ter um nome"),
    font_variations: z.number().optional(),
    font_type: z.string().optional(),
    fontlinks: z.array(
        z.object({
            fontLink: z.url("Link inválido")
        })
    ).optional()
})

export {fontSchemaZod}