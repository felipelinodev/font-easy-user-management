import { Request, Response } from "express";
import { z } from "zod";
import { fontSchemaZod } from "../schemas/FavoriteFontsSchema";
import { favoriteFontsCreate, favoritefontsDelete, GetAllfavoriteFontsByUser } from "../database/FavoriteFontsDao";

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


async function favoriteFontsControllerDelete(req: Request, res: Response){
    const idFont = Number(req.params.id)
    
    if(isNaN(idFont)){
        return res.status(400).json({error: "ID inválido"})
    }

    await favoritefontsDelete(idFont)

    return res.status(200).json({message: "font deletada com sucesso."})
}


export {
    fontsControllerCreate,
    getAllFavoriteFontsController,
    favoriteFontsControllerDelete
}