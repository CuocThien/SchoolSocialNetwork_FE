import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as io from 'socket.io-client'
import { ChatService } from 'src/app/services';
import { EVENT_VIDEO_CHAT_CSS } from 'src/app/socket-event/client/video-chat';
import { HOST } from 'src/app/utils/constant';


@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class IncomingCallComponent implements OnInit {

  socket: any;
  constructor(
    private activeModal: NgbActiveModal,
    private chatService: ChatService
  ) { }
  myId: any;
  profile: any;
  remainingInterval: any;
  remainingCallingTime = 30;
  ngOnInit(): void {
    this.socket = io.io(`${HOST}`);
    this.myId = JSON.parse(localStorage.getItem('profile'))._id;
    this.remainingInterval = setInterval(() => {
      --this.remainingCallingTime;
      if (this.remainingCallingTime < 0) {
        clearInterval(this.remainingInterval);
        this.activeModal.dismiss();
      }
    }, 1000)
  }

  accept() {
    this.activeModal.close(this.profile);
    clearInterval(this.remainingInterval);
  }

  reject() {
    this.activeModal.dismiss('reject');
    clearInterval(this.remainingInterval);
    this.chatService.getConversation({ id1: this.profile._id, id2: this.myId }).subscribe({
      next: (res: any) => {
        const senderId = this.profile._id;
        const userId = this.myId;
        this.socket.emit(EVENT_VIDEO_CHAT_CSS.END_CALL_CSS, {
          conversationId: res.data._id,
          senderId,
          data: '00:00:00',
          type: 3,
          userId
        })
      }
    })
  }

}
