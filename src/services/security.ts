import bcrypt  from 'bcrypt';

async function generateHash(password: string){
    const salt = 10;
    return await bcrypt.hash(password, salt)
}

async function compareHash(password: string, hash: string){
    return await bcrypt.compare(password, hash)
}

export { generateHash, compareHash}