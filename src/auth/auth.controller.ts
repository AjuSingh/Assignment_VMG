import {
    Controller,
    Post,
    Put,
    Req,
    Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express'


@Controller()
export class AuthController {
    constructor(
        private jwtService: JwtService
    ) { }


    @Post('/login')
    login(@Req() request: Request, @Res() response: Response) {
        try {

            if (!request.body || !request.body.email || !request.body.password) {
                return response.status(403).json({ message: 'Please provide credentials to login' });
            }

            const email = process.env.USER_EMAIL;
            const password = process.env.USER_PASSWORD;


            if (!email || !password) {
                return response.status(403).json({ message: 'Please set credentials to env' });
            }

            const isValid = email === request.body.email && password === request.body.password;
            console.log(isValid);

            if (!isValid) {
                return response.status(403).json({ message: 'Please provide credentials to login' });
            }
            
            const token = this.jwtService.sign({ email }, { secret: process.env.JWT_SECRET })
            return response.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.log(error);
            response.status(401).json({ message: 'Unable to login!' })
        }
    }

}