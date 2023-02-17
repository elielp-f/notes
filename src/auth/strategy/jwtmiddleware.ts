import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(private jwt: JwtService, private config: ConfigService){}
    use(req:Request, res:Response, next:NextFunction){
        console.log(req);
        if(!req.headers.authorization){
            res.writeHead(401, { 'content-type': 'application/json' });
            res.write(JSON.stringify({
                msg: 'Authorization is required',
            }))
            res.end();
        }
        const token = req.headers.authorization.replace("Bearer", '').trim();
        const valid_token = this.jwt.verifyAsync(token, this.config.get('JWT_SECRET'));
        if(valid_token){
            next();
        }
        res.send("Token invalid");
    }
}