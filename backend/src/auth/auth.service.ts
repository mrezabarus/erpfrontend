import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        if(user && (await bcrypt.compare(password, user.password))){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string){
        const user = await this.validateUser(email, password);
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({sub: user.id, email: user.email});

        return {
            access_token: token,
            user,
        };
    }

    async getMeFromToken(token: string){
        try{
            
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userService.findById(payload.sub);

            if(!user) throw new UnauthorizedException('user tidak ditemukan');

            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        }catch (err){
            throw new UnauthorizedException('Token tidak valid');
        }
    }

    
}
