import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';


function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.cookies['font-easy-auth']

    if(!token) return res.status(401).json({error: 'Token não fornecido'})

    try {
        
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next()
    } catch (error) {
        console.log('Erro na verificação:', error)
        return res.status(401).json({error: 'Token inválido'})
    }
}

export{
   authMiddleware
}