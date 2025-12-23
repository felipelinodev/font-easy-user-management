import { z } from "zod";


const fontSchemaZod = z.object({
    user_id: z.number({ message: "É obrigatório adicionar o id do usuário da sessão." }),
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