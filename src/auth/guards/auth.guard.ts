import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_API_PUBLIC } from "src/utils/decorators";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwt: JwtService,
        private reflector: Reflector
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_API_PUBLIC, [context.getHandler(), context.getClass()]);
        if(isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const [type, token] = request.headers["authorization"]?.split(" ") ?? [];

        if (type != "Bearer") {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwt.verifyAsync(token);    
            request["user"] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}