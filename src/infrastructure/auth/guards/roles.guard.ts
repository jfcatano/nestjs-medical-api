import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

interface IAuthenticatedUser {
    role: string;
}

interface AuthenticatedRequest extends Request {
    user: IAuthenticatedUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user as { role: string };

        return requiredRoles.some((role) => user.role === role);
    }
}
