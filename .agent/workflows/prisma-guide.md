---
description: Guia completo de comandos e uso do Prisma ORM
---

# 📚 Guia Prisma - Cheat Sheet

## 🚀 Instalação

```bash
npm install prisma --save-dev      # CLI do Prisma
npm install @prisma/client         # Client para usar no código
```

---

## 🛠️ Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `npx prisma init` | Inicializa o Prisma no projeto |
| `npx prisma generate` | Gera/atualiza o Prisma Client |
| `npx prisma migrate dev --name <nome>` | Cria e aplica migration (dev) |
| `npx prisma migrate deploy` | Aplica migrations pendentes (produção) |
| `npx prisma migrate reset` | Reseta o banco e reaplica todas migrations |
| `npx prisma db push` | Sincroniza schema sem criar migrations |
| `npx prisma db pull` | Gera schema a partir de um banco existente |
| `npx prisma studio` | Abre interface visual do banco |
| `npx prisma format` | Formata o arquivo schema.prisma |
| `npx prisma validate` | Valida o schema.prisma |

---

## 📝 Exemplo de uso no código

### Instância única do PrismaClient (recomendado)

```typescript
// src/config/prisma.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### Usar em qualquer lugar

```typescript
import prisma from './config/prisma'

// Buscar todos
const users = await prisma.users.findMany()

// Buscar um
const user = await prisma.users.findUnique({
  where: { id: 1 }
})

// Buscar por condição
const user = await prisma.users.findFirst({
  where: { email: 'test@email.com' }
})

// Criar
const newUser = await prisma.users.create({
  data: {
    name: 'João',
    email: 'joao@email.com',
    password: 'hash123'
  }
})

// Atualizar
const updated = await prisma.users.update({
  where: { id: 1 },
  data: { name: 'Novo Nome' }
})

// Deletar
const deleted = await prisma.users.delete({
  where: { id: 1 }
})

// Contar
const count = await prisma.users.count()
```

---

## 🔗 Queries com Relacionamentos

### Include (trazer relações)

```typescript
const userWithFonts = await prisma.users.findUnique({
  where: { id: 1 },
  include: {
    favoritefonts: true  // traz as fontes favoritas
  }
})
```

### Select (escolher campos)

```typescript
const user = await prisma.users.findUnique({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    email: true
  }
})
```

### Nested include

```typescript
const userComplete = await prisma.users.findUnique({
  where: { id: 1 },
  include: {
    favoritefonts: {
      include: {
        fontlinks: true
      }
    }
  }
})
```

---

## 🔍 Filtros e Operadores

```typescript
// Múltiplas condições (AND implícito)
const users = await prisma.users.findMany({
  where: {
    name: 'João',
    plan_type: 'premium'
  }
})

// OR
const users = await prisma.users.findMany({
  where: {
    OR: [
      { email: { contains: 'gmail' } },
      { email: { contains: 'hotmail' } }
    ]
  }
})

// Operadores
const users = await prisma.users.findMany({
  where: {
    email: { contains: 'gmail' },      // contém
    name: { startsWith: 'Jo' },        // começa com
    id: { gt: 5 },                     // maior que
    id: { gte: 5 },                    // maior ou igual
    id: { lt: 10 },                    // menor que
    id: { lte: 10 },                   // menor ou igual
    id: { in: [1, 2, 3] },             // está na lista
    id: { notIn: [1, 2, 3] },          // não está na lista
    name: { not: null }                // não é nulo
  }
})
```

---

## 📊 Ordenação e Paginação

```typescript
const users = await prisma.users.findMany({
  orderBy: { name: 'asc' },  // ou 'desc'
  skip: 0,                   // pular X registros (offset)
  take: 10                   // limitar a X registros (limit)
})
```

---

## ⚡ Operações em Lote

```typescript
// Criar vários
await prisma.users.createMany({
  data: [
    { name: 'User 1', email: 'u1@email.com', password: '123' },
    { name: 'User 2', email: 'u2@email.com', password: '456' }
  ]
})

// Atualizar vários
await prisma.users.updateMany({
  where: { plan_type: null },
  data: { plan_type: 'free' }
})

// Deletar vários
await prisma.users.deleteMany({
  where: { plan_type: 'free' }
})
```

---

## 🔄 Transações

```typescript
const result = await prisma.$transaction([
  prisma.users.create({ data: { ... } }),
  prisma.favoritefonts.create({ data: { ... } })
])

// Ou com função
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.users.create({ data: { ... } })
  const font = await tx.favoritefonts.create({ 
    data: { user_id: user.id, ... } 
  })
  return { user, font }
})
```

---

## 🐛 Debug - Ver queries SQL

```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
```

---

## 📁 Estrutura de Arquivos

```
projeto/
├── prisma/
│   ├── schema.prisma        # Definição dos models
│   ├── prisma.config.ts     # Configuração do Prisma
│   └── migrations/          # Histórico de migrations
├── src/
│   ├── config/
│   │   └── prisma.ts        # Instância do PrismaClient
│   └── ...
```

---

## 🔗 Links Úteis

- [Documentação Oficial](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
