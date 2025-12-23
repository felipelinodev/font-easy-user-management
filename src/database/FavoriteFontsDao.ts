import prisma from "../lib/prisma";

type FavoriteFontsType = {
    user_id: number,
    font_name: string,
    font_variations?: number,
    font_type?: string,
    fontlinks?: { fontLink: string }[]
}

async function favoriteFontsCreate(data: FavoriteFontsType){
    return prisma.favoritefonts.create({
        data: {
            user_id: data.user_id,
            font_name: data.font_name,
            font_variations: data.font_variations,
            font_type: data.font_type,
            fontlinks: {
                create: data.fontlinks?.map(link => ({
                    font_link: link.fontLink
                })) ?? []
            }
        },
        include: { fontlinks: true }
    }

)
}


async function favoritefontsDelete(idFont: number) {
    return prisma.favoritefonts.delete({
        where: {id_font: idFont}
    })
}

async function GetAllfavoriteFontsByUser(userId: number){
    return prisma.favoritefonts.findMany({
        where: {user_id: userId},
        include: {fontlinks: true }
    })
}

async function getFavoriteFontsById(idFont: number) {
    return prisma.favoritefonts.findUnique({
        where: {id_font: idFont}
    })
    
}

export {
    favoriteFontsCreate,
    favoritefontsDelete,
    GetAllfavoriteFontsByUser,
    getFavoriteFontsById
}