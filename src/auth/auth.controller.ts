import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { SigninAuthDTO, SignupAuthDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() dto: SignupAuthDTO){
        console.log(dto);
        return await this.authService.signup(dto);
    }

    @Post('signin')
    async signin(@Body() dto: SigninAuthDTO){
        return await this.authService.signin(dto);
    }
}
