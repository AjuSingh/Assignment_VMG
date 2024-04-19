import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(@Inject(JwtService) private jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request:Request = context.switchToHttp().getRequest();
            const token = request.headers['authorization'] ? request.headers['authorization'].split(' ')[1] : '';
            this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
