import prisma from './lib/prisma'

async function criarUsuario() {
  const user = await prisma.users.create({
    data: {
      name: 'João Silva',
      email: 'joao@email.com',
      password: '123456'
    }
  })
  console.log('✅ Usuário criado:', user)
}

criarUsuario()