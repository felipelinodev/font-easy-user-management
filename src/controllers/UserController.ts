import { Request, Response } from "express";
import { userCreate, userDelete, userGetById, userLogin, userUpdate, userGoogleLogin, userGoogleCreate } from "../database/UserDao";
import { z } from "zod";
import { loginSchemaZod, userGoogleSchemaZod, userSchemaZod } from "../schemas/UserSchema";
import { generateHash } from "../services/security";
import { generateToken } from "../services/auth";
import 'dotenv/config';

async function userControllerCreate(req: Request, res: Response){    
    const user = userSchemaZod.safeParse(req.body)

    if(!user.success){
        return res.status(400).json({erros: z.flattenError(user.error)})
    }

    user.data.password = await generateHash(user.data.password)

    await userCreate(user.data)

    res.status(201).json({message: "usuario criado com sucesso!", user })
}

async function userGoogleControllerCreate(req: Request, res: Response){
    const googleUser = userGoogleSchemaZod.safeParse(req.body);

    if(!googleUser.success){
        return res.status(400).json({erros: z.flattenError(googleUser.error)})
    }

    await userGoogleCreate(googleUser.data);

    res.status(201).json({message: "usuario criado com sucesso!", googleUser })
}

async function userGoogleControllerLogin(req: Request, res: Response) {
    const {google_id} = req.body;

    if(!google_id){
        return res.status(400).json({ errors: 'google_id é obrigatório' })
    }


    const userGoogle = await userGoogleLogin(google_id);

    if(!userGoogle){
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const tokenAuth = generateToken(userGoogle.id)


    res.cookie('font-easy-auth', tokenAuth, {
        httpOnly: true,
        secure: false, // ⚠️ EM PRODUÇÃO: secure: true (HTTPS obrigatório)
        sameSite: 'lax', // ⚠️ EM PRODUÇÃO: 'none' (front e back em domínios diferentes)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    })


    res.status(200).json({message: "Login realizado com sucesso."})

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

   
    res.cookie('font-easy-auth', tokenAuth, {
        httpOnly: true,
        secure: false, // ⚠️ DEV (localhost). EM PRODUÇÃO: secure: true (HTTPS obrigatório)
        sameSite: 'lax', // ⚠️ DEV. EM PRODUÇÃO: 'none' (front e back em domínios diferentes)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
        })

    res.status(200).json({message: "Login realizado com sucesso."})
}



async function userControllerProfile(req: Request, res: Response){
    const { userId } = req.body.user;
    const user = await userGetById(userId);

    if(!user){
        return res.status(404).json({error: "usuário não encontrado."})
    }

    res.status(200).json({user})
}


async function userControllerUpdate(req: Request, res: Response) {
    const {userId} = req.body.user;
    const { user, ...dataUpdate } = req.body; 

    try {
        const updated = await userUpdate(userId, dataUpdate);
        res.status(200).json({message: "Usuário atualizado com sucesso.", data: updated});
    } catch (error) {
        return res.status(404).json({error: "usuario não encontrado ou token invalido."}) 
    }

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
    userControllerLogin,
    userControllerProfile,
    userControllerUpdate,
    userGoogleControllerCreate,
    userGoogleControllerLogin
}