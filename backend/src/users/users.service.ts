import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    async findByEmail(email: string){
        return this.userRepo.findOne({where: {email}});
    }

    async create(data: {email: string; password: string; name: string}){
        const hashed = await bcrypt.hash(data.password,10);
        const user = this.userRepo.create({
            ...data,
            password: hashed,
        });
        return this.userRepo.save(user);
    }

    async findById(id: string){
        return this.userRepo.findOne({
            where : {id},
        })
    }
}
