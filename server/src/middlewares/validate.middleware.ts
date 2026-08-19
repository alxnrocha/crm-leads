import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

const sendValidationError = (res: Response, error: ZodError): void => {
  res.status(400).json({
    error: 'Validation Error',
    details: error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    })),
  });
};

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendValidationError(res, error);
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.query = (await schema.parseAsync(req.query)) as Request['query'];
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendValidationError(res, error);
        return;
      }
      next(error);
    }
  };
};
