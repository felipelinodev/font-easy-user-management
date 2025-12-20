import prisma from '../lib/prisma'


type userData = {
  name: string;
  email: string;
  password: string;
  photo: string;
  plan_type: string;
}

async function userCreate(data: userData){
    return prisma.users.create({data})
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
    userDelete
}