import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from "process";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
     super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET||'default_secret',
     });
    }

    async validate(payload:any){
        return payload
    }
}