import { Request, Response } from "express";
import { userCreate, userDelete, userLogin } from "../database/UserDao";
import { z } from "zod";
import { loginSchemaZod, userSchemaZod } from "../schemas/UserSchema";
import { generateHash } from "../services/security";
import { generateToken } from "../services/auth";

async function userControllerCreate(req: Request, res: Response){    
    const user = userSchemaZod.safeParse(req.body)

    if(!user.success){
        return res.status(400).json({erros: z.flattenError(user.error)})
    }

    user.data.password = await generateHash(user.data.password)

    await userCreate(user.data)

    res.status(201).json({message: "usuario criado com sucesso!", user })
}


async function userControllerLogin(req: Request, res: Response){
    const user = loginSchemaZod.safeParse(req.body);

    if(!user.success){
        return res.status(400).json({erros: z.flattenError(user.error)})
    }

    const loginData = await userLogin(user.data)

    if(!loginData){
        return res.status(401).json({error: 'Credenciais inválidas.'})
    }
    const tokenAuth = generateToken(loginData.id)

    res.status(200).json({message: "Login realizado com sucesso.", tokenAuth})
}





async function userControllerDelete(req: Request, res: Response){
    const id = Number(req.params.id)
    
    if(isNaN(id)){
        return res.status(400).json({error: "ID inválido"})
    }
    await userDelete(id)
    res.status(200).json({message: "usuario deletado com sucesso!"})
}

export{
    userControllerDelete,
    userControllerCreate,
    userControllerLogin
}