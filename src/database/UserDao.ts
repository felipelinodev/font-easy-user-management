import prisma from '../lib/prisma'
import { compareHash } from '../services/security';


type UserData = {
  name: string;
  email: string;
  password: string;
  photo: string;
  plan_type: string;
}

type LoginData = {
  email: string;
  password: string;
}

async function userCreate(data: UserData){
    return prisma.users.create({data})
}

async function userLogin(data: LoginData) {
   const {email, password} = data;

   const user = await prisma.users.findUnique({
    where: { email }
   }) 

   if(!user){
    return null
   }

   const isValidPassword = await compareHash(password, user.password)

   if (!isValidPassword) {
     return null;
   }

   const { password: _, ...userWithoutPassword }  = user;

   return userWithoutPassword;
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
    userDelete,
    userLogin,
}