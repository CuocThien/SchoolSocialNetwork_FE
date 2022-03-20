import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { EVENT_MESSAGE_CSS } from '../../socket-event/client/message';
import { EVENT_MESSAGE_SSC } from '../../socket-event/server/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChatComponent implements OnInit {

  userName = '';
  message = '';
  messageList: { message: string, userName: string, mine: boolean }[] = [];
  userList: string[] = [];
  socket: any;

  constructor() { }

  userNameUpdate(name: string): void {

    this.userName = name;

    this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS, {
      room: name
    });





  }

  sendMessage(): void {
    const msg = {
      "room": this.userName,
      "conversationId": "622dbbdca3c3ffa343402263",
      "userSenderId": "1234",
      "data": "alo alo",
      "type": "0",
      "isSeen": 0,
      "createdAt": "2022-03-13T09:58:52.814Z",
      "_id": "622dc084667a9528f96a7c9a",
      "__v": 0
    }
    this.socket.emit(EVENT_MESSAGE_CSS.SEND_MESSAGE_CSS, msg);
    this.messageList.push({ message: JSON.stringify(msg), userName: this.userName, mine: true });
    this.message = '';


  }

  ngOnInit(): void {
    this.socket = io.io(`http://localhost:3000/`);

    this.socket.on(EVENT_MESSAGE_SSC.JOIN_ROOM_SSC, (data: any) => {
      console.log(data)
    });


    this.socket.on(EVENT_MESSAGE_SSC.SEND_MESSAGE_SSC, (data: any) => {
      console.log("🚀 ~ file: chat.component.ts ~ line 35 ~ ChatComponent ~ this.socket.on ~ msg", data)

    });

  }

}
