import { Response, Request, NextFunction } from "express"
import { filterError } from "../helpers/utils"

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => { 
    const filteredError = filterError(err)
    
    res.status(filteredError.statusCode).json({
        success: false,
        name: filteredError.name,
        status: filteredError.statusCode,
        message: filteredError.message,
        code: filteredError.code
    })
}