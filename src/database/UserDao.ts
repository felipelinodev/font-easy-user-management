import prisma from '../lib/prisma'
import { compareHash } from '../services/security';



type UserData = {
  name: string;
  email: string;
  password?: string;
  photo?: string;
  plan_type: string;
}


type UserDataGoogle = UserData & {
  google_id: string;
}


type UserDataUpdate = {
  name?: string | null;
  email?: string;
  password?: string;
  photo?: string | null;
  plan_type?: string;
}


type LoginData = {
  email: string;
  password: string;
}

async function userCreate(data: UserData){
    return prisma.users.create({data})
}

async function userGoogleCreate(data: UserDataGoogle) {
   return prisma.users.upsert({
     where: { email: data.email },
     update: {
       // Atualiza dados do Google se o usuário já existir
       google_id: data.google_id,
       name: data.name,
       photo: data.photo
     },
     create: data
   })
}

async function userGoogleLogin(google_id: string){
   return prisma.users.findUnique({
     where: {google_id}
   })

}

async function userLogin(data: LoginData) {
   const {email, password} = data;

   const user = await prisma.users.findUnique({
    where: { email }
   }) 

   if(!user){
    return null
   }
   
   if(!user.password){
    return null
   }

   const isValidPassword = await compareHash(password, user.password)

   if (!isValidPassword) {
     return null;
   }


   const { password: _, ...userWithoutPassword }  = user;

   return userWithoutPassword;
}

async function userGetById(id: number){
  return prisma.users.findUnique({
    where: {id},
    select: {id: true, name: true, email: true, photo: true, plan_type: true}
  })
}


async function userUpdate(id: number, data: Partial<UserDataUpdate>) {
  return prisma.users.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, photo: true, plan_type: true }
  })
}


async function userDelete(id: number){
  return prisma.users.delete({
    where: {
      id,
    }
  })
}


export {
    userCreate,
    userGoogleCreate,
    userDelete,
    userLogin,
    userGetById,
    userUpdate,
    userGoogleLogin
}