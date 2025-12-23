import { Request, Response } from "express";
import { z } from "zod";
import { fontSchemaZod } from "../schemas/FavoriteFontsSchema";
import { favoriteFontsCreate, GetAllfavoriteFontsByUser } from "../database/FavoriteFontsDao";

async function fontsControllerCreate(req: Request, res: Response){
    const font = fontSchemaZod.safeParse(req.body)

    if(!font.success){
        return res.status(400).json({errors : z.flattenError(font.error)})
    }

    const userId = (req as any).user.id

    await favoriteFontsCreate({
        ...font.data,
        user_id: userId
    })

    return res.status(201).json({ message: "font adicionada sucesso!", font})
}


async function getAllFavoriteFontsController(req: Request, res: Response){

    const userId = (req as any).user.id

    const all_fonts = await GetAllfavoriteFontsByUser(userId)

    return res.status(200).json(all_fonts)

    
}


export {
    fontsControllerCreate,
    getAllFavoriteFontsController
}