import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Request } from 'express';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (req: Request) => string | null,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.findUserById(payload.sub);
        console.log(user);
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
