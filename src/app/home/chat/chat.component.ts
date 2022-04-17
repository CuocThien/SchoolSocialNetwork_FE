import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { EVENT_MESSAGE_CSS } from '../../socket-event/client/message';
import { EVENT_MESSAGE_SSC } from '../../socket-event/server/message';

import { faPaperPlane, } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/index';
import { HOST } from 'src/app/utils/constant';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class ChatComponent implements OnInit {

  faSend = faPaperPlane;
  currentUserId = '';
  partnerUserId = '';
  message = '';
  messageList: any;
  socket: any;
  listConversation: any;
  activeIndex = 0;
  conversationId = '';
  profile: any;
  pageMessage = 0;
  chatTitle: any;
  searchString = '';
  pageSearchAccount = 0;
  listAccountSearch: any;
  countSendMessage = 0;
  isConversationSearch = false;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  isLoadOldMessage = false;
  flag = false;
  @ViewChild('chatBoxContent') private chatbox!: ElementRef;

  constructor(
    private service: ChatService,
    private spinner: NgxSpinnerService
  ) {
    this.socket = io.io(`${HOST}`);
    this.socket.on(EVENT_MESSAGE_SSC.JOIN_ROOM_SSC, (data: any) => {
      console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.SEND_MESSAGE_SSC, (data: any) => {
      console.log(data)
      this.isLoadOldMessage = false;
      this.messageList.push({ data: data.data.data, isAuth: false })
      this.listConversation[this.activeIndex].lastestMessage = data.data.data;
    });
    this.socket.on(EVENT_MESSAGE_SSC.LEAVE_ROOM_SSC, (data: any) => {
      console.log(data)
    });
  }


  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
    this.currentUserId = this.profile._id;
    this.service.getListConversation().subscribe((res: any) => {
      this.listConversation = res.data.result;
      this.conversationId = this.listConversation[0]._id;
      this.partnerUserId = this.listConversation[0].participantId;
      this._setChatTitle(this.listConversation[0].user)
      this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
        [this.currentUserId, this.listConversation[0].participantId]);
      this.getMessage()
    })
    this.scrollToBottom();

  }

  ngOnDestroy() {
    this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_CSS, {
      room: this.conversationId
    });
  }

  ngAfterViewChecked() {
    if (!this.isLoadOldMessage)
      this.scrollToBottom();
  }

  _setChatTitle(data: any) {
    const { avatar, fullname } = data || {}
    this.chatTitle = {
      avatar,
      fullname
    }
  }

  joinConversation(user: any, index: number, isSearch: boolean) {
    if (!isSearch)
      this.activeIndex = index;

    if (this.searchString != '') {
      this.isConversationSearch = true;
      this.countSendMessage = 0;
    } else {
      this.isConversationSearch = false;
    }

    if (this.partnerUserId != user._id) {
      this.partnerUserId = user._id;
      this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
        [this.currentUserId, user._id]
      );
      this._getConversation(this.currentUserId, user._id)
    }

  }

  getListConversation() {
    this.spinner.show();
    this.service.getListConversation().subscribe((res: any) => {
      this.listConversation = res.data.result;
      this.conversationId = this.listConversation[0]._id;
      this.spinner.hide();
    })
  }
  _getConversation(id1: any, id2: any) {
    this.spinner.show();
    // console.log("🐼 => ChatComponent => { id1, id2 }", { id1, id2 })
    this.service.getConversation({ id1, id2 }).subscribe((res: any) => {
      // console.log("🐼 => ChatComponent => res", res)
      const { _id, user } = res.data || {}
      if (this.conversationId != _id) {
        this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_CSS, {
          room: this.conversationId
        });
      }
      this.conversationId = _id;
      this.pageMessage = 0;
      this.getMessage();
      this._setChatTitle(user)
      this.searchString = '';

      if (this.countSendMessage == 0 && this.isConversationSearch && this.flag) {
        this.listConversation.unshift(res.data);
        this.activeIndex = 0;
      } else if (this.countSendMessage == 0 && !this.isConversationSearch && this.flag) {
        this.getListConversation();
        this.activeIndex--;
        this.flag = false;
      }
      this.spinner.hide();
    })
  }
  getMessage() {
    this.spinner.show();
    const reqData = { conversationId: this.conversationId, page: this.pageMessage }
    this.service.getMessage(reqData).subscribe((res: any) => {
      this.messageList = res.data.lstMessage;
      this.isLoadOldMessage = false;
      this.spinner.hide();
    })
  }
  getMoreMessage() {
    this.spinner.show();
    this.pageMessage++;
    this.service.getMessage({ conversationId: this.conversationId, page: this.pageMessage })
      .subscribe(
        (res: any) => {
          const oldMessage = res.data.lstMessage;
          oldMessage.reverse().map((itm: any) => {
            this.messageList.unshift(itm);
          })
          this.spinner.hide();
        })
    this.isLoadOldMessage = true;
  }
  sendMessage(): void {
    if (this.message == '') return;
    this.countSendMessage++;
    const msg = {
      conversationId: this.conversationId,
      senderId: this.currentUserId,
      data: this.message
    }
    this.socket.emit(EVENT_MESSAGE_CSS.SEND_MESSAGE_CSS, msg);
    this.messageList.push({ data: this.message, isAuth: true });
    this.listConversation[this.activeIndex].lastestMessage = this.message;
    this.isLoadOldMessage = false;
    this.message = '';
  }
  searchAccount() {
    if (this.searchString != '') {
      this.spinner.show();
      this.flag = true;
      const reqData = { keyword: this.searchString, page: this.pageSearchAccount }
      this.service.searchAccount(reqData).subscribe((res: any) => {
        this.listAccountSearch = res.data.result;
        this.spinner.hide();
      })
    }
  }
  scrollToBottom(): void {
    try {
      this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onUp(ev: any) {
    this.getMoreMessage();
    this.isLoadOldMessage = true;
  }
}
