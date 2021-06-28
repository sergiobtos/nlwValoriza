import { Request, Response, NextFunction, request } from "express";
import{ verify } from "jsonwebtoken";

interface IPayload{
   sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next:NextFunction){
    
   const authToken = req.headers.authorization;
   if(!authToken){return res.status(401).end();}

   const [,token] = authToken.split(" ");

   try {
    const {sub} = verify(
       token, 
       "3bffa4ebdf4874e506c2b12405796aa5"
       ) as IPayload;
    request.user_id = sub;
    return next();
   } catch (error) {
    return res.status(401).end();
   }
   

}