import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import *as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwt:JwtService
    ){}

    async register(dto:RegisterDto){
        const exists=await this.userService.findByEmail(dto.email);
        if(exists) throw new BadRequestException("Email is already exists");

        const hashed =await bcrypt.hash(dto.password,10);

        const user =await this.userService.create({
            ...dto,
            password:hashed,
        });
        return user;
    }

    async login(dto:LoginDto){
        const user=await this.userService.findByEmail(dto.email);
        if(!user) throw new UnauthorizedException('Invalid credentials')

            const isMatch =await bcrypt.compare(dto.password,user.password);
            if(!isMatch) throw new UnauthorizedException('Invalid credentials')

        const token=this.jwt.sign({id:user._id});

     return {
        message:'Login successful',
        token,
        user,
     }   
    }
}
