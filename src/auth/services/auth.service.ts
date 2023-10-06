import { Injectable } from '@nestjs/common';
import { UserDao } from '../data/dao/user.dao';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto/token.dto';
import { UserInfoDto } from '../dto/user-info.dto';
import { CredentialsDto } from '../dto/credentials.dto';

@Injectable()
export class AuthService {

    constructor(
        private dao: UserDao,
        private jwt: JwtService
    ){}

    async login(credentials: CredentialsDto): Promise<TokenDto | undefined> {
        const {email, password} = credentials;
        const user = await this.dao.getByEmailAndPassword(email, password);

        if(!user) {
            return undefined;
        }

        const payload = {... user, password: undefined};
        const token = await this.jwt.signAsync(payload);
        return { token };
    }

    async signIn(user: UserInfoDto): Promise<TokenDto> {
        await this.dao.insert(user);

        const payload = {... user, password: undefined};
        const token = await this.jwt.signAsync(payload);
        return { token };
    }

}
