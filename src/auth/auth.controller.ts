import { Body, Controller, Post, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { TokenDto } from './dto/token.dto';
import { AuthService } from './services/auth.service';
import { UserInfoDto } from './dto/user-info.dto';
import { ApiPublic } from 'src/utils/decorators';

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService){}

    @Post("login")
    @ApiPublic()
    async login(@Body() credentials: CredentialsDto): Promise<TokenDto> {
        const result = await this.service.login(credentials);
        if(!result) {
            throw new UnauthorizedException();
        }
        return result;
    }

    @Post("signin")
    @ApiPublic()
    async signIn(@Body() userInfo: UserInfoDto): Promise<TokenDto>{
        return this.service.signIn(userInfo);
    }
}
