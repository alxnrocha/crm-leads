import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/User.js';

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token de autenticación no proporcionado o formato inválido.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: number;
      email: string;
      role: 'admin' | 'sales';
    };

    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email', 'role', 'avatar_url'],
    });

    if (!user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'El usuario asociado a este token ya no existe.',
      });
      return;
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token inválido o expirado.',
    });
  }
};
