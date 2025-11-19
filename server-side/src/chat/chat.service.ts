import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';



@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) { }

    async saveMessage(data: {
        roomId: string;
        senderId: string;
        text?: string;
    }){
        const message =await this.messageModel.create(data);
        return message;
    }

    async getRoomMessages(roomId:string){
        return  this.messageModel.find({roomId}).sort({ createdAt: 1}).exec()
    }
}