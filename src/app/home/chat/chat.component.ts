import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { EVENT_MESSAGE_CSS } from '../../socket-event/client/message';
import { EVENT_MESSAGE_SSC } from '../../socket-event/server/message';

import { faPaperPlane, } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/index';
import { HOST } from 'src/app/utils/constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { EVENT_VIDEO_CHAT_CSS } from 'src/app/socket-event/client/video-chat';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VideoChatComponent } from 'src/app/popup/video-chat/video-chat.component';


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
  listConversation = [];
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
  isRedirectFromSearch = false;
  conversationFromSearch: any;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  isLoadOldMessage = false;
  flag = false;
  @ViewChild('chatBoxContent') private chatbox!: ElementRef;

  modalRef: NgbModalRef;
  constructor(
    private service: ChatService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.socket = io.io(`${HOST}`);
    this.socket.on(EVENT_MESSAGE_SSC.JOIN_ROOM_SSC, (data: any) => {
      //console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.SEND_MESSAGE_SSC, (data: any) => {
      //console.log(data)
      this.isLoadOldMessage = false;
      this.messageList.push({ data: data.data.data, isAuth: false, type: 0 })
      this.listConversation[this.activeIndex].lastestMessage = data.data.data;
    });
    this.socket.on(EVENT_MESSAGE_SSC.LEAVE_ROOM_SSC, (data: any) => {
      //console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.JOIN_ROOM_OFFLINE_SSC, (data: any) => {
      //console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.LEAVE_ROOM_OFFLINE_SSC, (data: any) => {
      //console.log(data)
    });
    this.socket.on(EVENT_MESSAGE_SSC.SEND_MESSAGE_OFFLINE_SSC, (payload: any) => {
      //console.log(payload)
      const { data } = payload || {}
      if (data.conversationId != this.conversationId) {
        this.getListConversationFromEventOffline()
      }
    });
  }


  ngOnInit(): void {
    this.conversationFromSearch = JSON.parse(localStorage.getItem('conversation'))
    this.isRedirectFromSearch = !!this.conversationFromSearch;
    this.profile = JSON.parse(localStorage.getItem('profile') || '')
    this.currentUserId = this.profile._id;
    this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_OFFLINE_CSS, {
      room: `Channel_offline_${this.currentUserId}`
    })
    this.service.getListConversation().subscribe((res: any) => {
      this.listConversation = res.data.result;
      if (this.listConversation.length) {
        if (!this.isRedirectFromSearch) {
          this.conversationId = this.listConversation[0]._id;
          this.partnerUserId = this.listConversation[0].participantId;
          this._setChatTitle(this.listConversation[0].user)
        } else {
          this.conversationId = this.conversationFromSearch._id;
          this.partnerUserId = this.conversationFromSearch.user._id;
          this._setChatTitle(this.conversationFromSearch.user)
          this.listConversation = this.listConversation.filter((itm: any) => itm._id != this.conversationFromSearch._id)
          this.listConversation.unshift(this.conversationFromSearch);
        }
        this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
          [this.currentUserId, this.partnerUserId]);
        this.getMessage()
        return;
      }
      if (this.isRedirectFromSearch) {
        this.listConversation.unshift(this.conversationFromSearch);
        this.conversationId = this.conversationFromSearch._id;
        this.partnerUserId = this.conversationFromSearch.user._id;
        this._setChatTitle(this.conversationFromSearch.user);
        this.socket.emit(EVENT_MESSAGE_CSS.JOIN_ROOM_CSS,
          [this.currentUserId, this.partnerUserId]);
        this.getMessage()
      }
    })
    if (this.listConversation)
      this.scrollToBottom();

  }

  ngOnDestroy() {
    this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_CSS, {
      room: this.conversationId
    });
    this.socket.emit(EVENT_MESSAGE_CSS.LEAVE_ROOM_OFFLINE_CSS, {
      room: `Channel_offline_${this.currentUserId}`
    })
    localStorage.removeItem('conversation')
  }

  ngAfterViewChecked() {
    if (!this.isLoadOldMessage)
      this.scrollToBottom();
  }

  _setChatTitle(data: any) {
    const { avatar, fullname, _id } = data || {}
    this.chatTitle = {
      avatar,
      fullname,
      _id
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
  getListConversationFromEventOffline() {
    this.service.getListConversation().subscribe((res: any) => {
      this.listConversation = res.data.result;
      Object.values(this.listConversation).forEach((itm: any, i) => {
        if (itm._id == this.conversationId) {
          this.activeIndex = i;
          return;
        }
      })
    })
  }
  _getConversation(id1: any, id2: any) {
    this.spinner.show();
    this.service.getConversation({ id1, id2 }).subscribe((res: any) => {
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
        this.listConversation = this.listConversation.filter((itm: any) => itm._id != res.data._id)
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
    if (this.message.trim() == '') {
      this.message = ''
      return;
    }
    this.countSendMessage++;
    const msg = {
      conversationId: this.conversationId,
      senderId: this.currentUserId,
      data: this.message
    }
    this.socket.emit(EVENT_MESSAGE_CSS.SEND_MESSAGE_CSS, msg);
    this.messageList.push({ data: this.message, isAuth: true, type: 0 });
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
  call() {
    this.socket.emit(EVENT_VIDEO_CHAT_CSS.JOIN_ROOM_VIDEO_CHAT_CSS,
      { userId: this.chatTitle._id, callerId: this.currentUserId })
    this.modalRef = this.modalService.open(VideoChatComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
      fullscreen: true
    });
    this.modalRef.componentInstance.profile = this.chatTitle;
    this.modalRef.result.then((res: any) => {
      this.messageList.push(res.data)
    }).catch((err: any) => {
    });

  }
}
