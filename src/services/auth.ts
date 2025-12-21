import jwt from 'jsonwebtoken'
import 'dotenv/config';

const secret = process.env.JWT_SECRET!;

function generateToken(userId: number){
    return jwt.sign({userId}, secret, {
        expiresIn: '7d'
    })
}

function verifyToken(token: string){
    return jwt.verify(token, secret);
}

export{ generateToken, verifyToken}