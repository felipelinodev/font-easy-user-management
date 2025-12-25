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


const userGoogleSchemaZod = z.object({
    name: z.string().min(1, "É necessário adicionar um nome."),
    email: z.email("Email inválido."),
    password: z.string().optional(),
    google_id: z.string('Id inválido.'),
    photo: z.url().optional(),
    plan_type: z.string().optional().default("FREE")
})

export { userSchemaZod, loginSchemaZod, userGoogleSchemaZod }