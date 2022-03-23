import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { EVENT_MESSAGE_CSS } from '../../socket-event/client/message';
import { EVENT_MESSAGE_SSC } from '../../socket-event/server/message';

import { faPaperPlane, } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from './chat.service';
import { HOST } from 'src/app/utils/constant';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChatComponent implements OnInit {

  faSend = faPaperPlane;
  userName = '';
  message = '';
  messageList: any;
  socket: any;
  listConversation: any;
  activeIndex = 0;
  activeSearchIndex = -1;
  conversationId = '';
  profile: any;
  pageMessage = 0;
  chatTitle: any;
  searchString = '';
  pageSearchAccount = 0;
  listAccountSearch: any;
  @ViewChild('chatBoxContent') private chatbox!: ElementRef;

  constructor(private service: ChatService) {
    this.socket = io.io(`${HOST}`);
    this.socket.on(EVENT_MESSAGE_SSC.JOIN_ROOM_SSC, (data: any) => {
      console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.SEND_MESSAGE_SSC, (data: any) => {
      console.log(data)
      this.messageList.push({ data: data.data.data, isAuth: false })
    });
    this.socket.on(EVENT_MESSAGE_SSC.LEAVE_ROOM_SSC, (data: any) => {
      console.log(data)
    });
  }

  joinConversation(room: any, participantId: any, index: number) {
    this.activeIndex = index
    if (this.conversationId != room) {
      this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_CSS, {
        room: this.conversationId
      });
      this.conversationId = room;
      this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
        [this.profile._id, participantId]
      );
    }
  }

  joinConversationWithoutRoom(participantId: any, index: number) {
    this.activeSearchIndex = index
    if (this.conversationId != '') {
      this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_CSS, {
        room: this.conversationId
      });

    }
    this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
      [this.profile._id, participantId]
    );
  }

  sendMessage(): void {
    const msg = {
      conversationId: this.conversationId,
      senderId: this.profile._id,
      data: this.message
    }
    this.socket.emit(EVENT_MESSAGE_CSS.SEND_MESSAGE_CSS, msg);
    this.messageList.push({ data: this.message, isAuth: true });
    this.message = '';
  }

  ngOnInit(): void {
    this.service.getListConversation().subscribe((res: any) => {
      this.profile = JSON.parse(localStorage.getItem('profile') || '')
      this.listConversation = res.data.result;
      this.conversationId = this.listConversation[0]._id;
      this.chatTitle = {
        avatar: this.listConversation[0].avatar,
        fullname: this.listConversation[0].fullname
      }
      this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
        [this.profile._id, this.listConversation[0].participantId]);
      this.getMessage()
    })
    this.scrollToBottom();

  }

  getMessage() {
    this.service.getMessage({ conversationId: this.conversationId, page: this.pageMessage }).subscribe((res: any) => {
      this.messageList = res.data.lstMessage
    })
  }

  searchAccount() {
    const reqData = { keyword: this.searchString, page: this.pageSearchAccount }
    this.service.searchAccount(reqData).subscribe((res: any) => {
      this.listAccountSearch = res.data.result;
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.scrollToTop();
  }

  scrollToBottom(): void {
    try {
      this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
    } catch (err) { }
  }
  scrollToTop(): void {
    if (this.chatbox.nativeElement.scrollTop == 0) {
      console.log(1)
    }
  }
}
