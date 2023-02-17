import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { userRepository } from "src/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(config: ConfigService, private userRepository: userRepository){
        super({
            jwtFromRequest: 
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    async validate(payload: {
        sub: string,
        email: string,
    }){
        console.log("herrrere");
        const user = await this.userRepository.findByEmail(payload.email);
        if(!user){
            throw new UnauthorizedException();
        }
        delete user.hash;
        return user;
    }
}