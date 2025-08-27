import { Request, Response, NextFunction } from "express";


type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

const catchErrors = (controller: AsyncController): AsyncController =>{
    return async (req, res, next) => {
        try{
            await controller(req, res, next);
        }catch (error){
            // pass err on
            next(error);
        }
    }
}

export default catchErrors;