import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(data: Partial<User>): Promise<User> {
        return this.userModel.create(data);
    }

    async findByEmail(email:string): Promise<User | null> {
        return this.userModel.findOne({email});
    }
    async findById(id:string): Promise<User |null> {
        return this.userModel.findById(id)
    }
    async findAll(): Promise<User[]>{
       return this.userModel.find()
    }
}
