import { z } from "zod";


const loginSchemaZod = z.object({
    email: z.email("Email inválido."),
    password: z.string(),
})


const userSchemaZod = z.object({
    name: z.string().min(1, "É necessário adicionar um nome."),
    email: z.email("Email inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    photo: z.url().optional().default("minhafoto.com"),
    plan_type: z.string().optional().default("FREE")
})

export { userSchemaZod, loginSchemaZod }