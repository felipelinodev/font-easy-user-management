import { Request, Response } from "express";
import { userCreate, userDelete } from "../database/UserDao";


async function userControllerCreate(req: Request, res: Response){
    const {name, email, password, photo="minhafoto.com"} = req.body

    const plan_type = "Free" 

    const user = {
        name, 
        email, 
        password, 
        photo, 
        plan_type
    }

    if(!name && !email && !password){
        return res.status(400).json({error: "Nenhum dado preenchido."})
    }

    if(!name){
        return res.status(400).json({error: "É necessário adicionar um nome."})
    }

    if(!email){
        return res.status(400).json({error: "É necessário adicionar um email."})
    }

     if(!password){
       return res.status(400).json({error: "É necessário adicionar uma senha."})
    }

    await userCreate(user)

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