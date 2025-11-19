import {io} from 'socket.io-client'

const socket= io('http://localhost:3001',{transports:["websocket"]})

socket.emit("joinRoom",{roomId:"123"});

socket.emit("sendMessage",{
    roomId:"123",
    message:"forntendUser",
    sender:"userA"
})

export default socket;