import { Request, Response } from "express";
import { userCreate, userDelete } from "../database/UserDao";
import { z } from "zod";
import { userSchemaZod } from "../schemas/UserSchema";

async function userControllerCreate(req: Request, res: Response){
    const user = userSchemaZod.safeParse(req.body)

    if(!user.success){
        return res.status(400).json({erros: z.flattenError(user.error)})
    }

    await userCreate(user.data)

    res.status(201).json({message: "usuario criado com sucesso!", user})
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
    userControllerCreate
}