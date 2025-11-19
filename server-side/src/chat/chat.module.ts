import { Module } from "@nestjs/common";
import { ChatGateWay } from "./chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./message.schema";
import { ChatService } from "./chat.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Message.name, schema:MessageSchema},
        ])
    ],
    providers:[ChatService,ChatGateWay],
    exports:[ChatService]
})
export class ChatModule {}