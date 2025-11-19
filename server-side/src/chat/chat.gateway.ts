import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';


@WebSocketGateway({
    cors: { origin: "*" }
})

export class ChatGateWay {

    constructor(private chatService: ChatService) { }

    @WebSocketServer()
    server: Server;


    @SubscribeMessage('joinRoom')
    joinRoom(
        @MessageBody() rawData: any,
        @ConnectedSocket() client: Socket,
    ) {

        const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;


        if (!data || !data.roomId) {
            console.log("joinRoom ignored because roomId missing");
            return;
        }

        console.log("user joined room", data.roomId);

        client.join(data.roomId);

        console.log(`Client joined room: ${data.roomId}`);

        client.emit("joinedRoom", { roomId: data.roomId });
    }



    @SubscribeMessage('sendMessage')
    async sendMessage(
        @MessageBody() rawData: any,
        @ConnectedSocket() client: Socket
    ) {
        const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

        console.log("Parsed message:", data);

        const saved = await this.chatService.saveMessage({
            roomId: data.roomId,
            senderId: data.senderId,
            text: data.text,
        });

        this.server.to(data.roomId).emit("receiveMessage", saved);

        console.log(`Message broadcast to room ${data.roomId}`);
    }


}