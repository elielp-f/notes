import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common/exceptions';
import {Prisma} from "@prisma/client";
import { userRepository } from 'src/repositories/repositories.module';
import { SigninAuthDTO, SignupAuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: userRepository,
        private jwt: JwtService
        ){}

    async signup(dto: SignupAuthDTO){
        try{
            const hash = await argon.hash(dto.password);
            const user = await this.userRepository.create(
                dto.firstName, dto.lastName, dto.email, hash
            );
            return this.signToken(user.id, user.email);
        }
        catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Email taken.');
                }
            }

        }
    }

    async signin(dto: SigninAuthDTO){
        const err = () => {throw new ForbiddenException("Email or password incorrects.");}
        const user = await this.userRepository.findByEmail(dto.email);
        if(!user){
            err();
        }
        const pwMatch = await argon.verify(user.hash, dto.password);
        if(!pwMatch){
            err();
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: string, email: string) : Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            email,
        }
        const secret = 'BATMAN';
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '20m',
                secret: secret,
            }
        );

        return {access_token: token}
    }


}
