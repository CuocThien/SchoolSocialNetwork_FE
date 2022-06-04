import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as io from 'socket.io-client';
import { ChatService } from 'src/app/services';
import { EVENT_VIDEO_CHAT_CSS } from 'src/app/socket-event/client/video-chat';
import { EVENT_VIDEO_CHAT_SSC } from 'src/app/socket-event/server/video-chat';
import { HOST } from 'src/app/utils/constant';
declare var Peer
const mediaConstraints = {
  audio: true,
  video: true
}
@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class VideoChatComponent implements OnInit {
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  socket: any;

  myId: any;
  localStream: MediaStream;
  remoteStream: MediaStream;
  myPeer: any;
  receiverId: any;
  isCalling = false;
  isAnswer = false;
  isMute = false;
  isOnLocalVideo = false;
  isOnRemoteVideo = false;
  isAccept = false;
  isReceiverAccept = false;
  profile: any;
  auth: any;


  callingTime = 0;
  timeString: any;
  intervalId: any;
  conversationId: any;

  remainingCallingTime = 30;
  remainingInterval: any;


  constructor(
    private chatService: ChatService,
    private activeModal: NgbActiveModal
  ) {
    this.auth = JSON.parse(localStorage.getItem('profile'));
    this.myId = this.auth._id;
    this.myPeer = new Peer(`${this.myId}`);
    this.socket = io.io(`${HOST}`);
    this.socket.emit(EVENT_VIDEO_CHAT_CSS.JOIN_ROOM_VIDEO_CHAT_CSS, { userId: this.myId });
    this.socket.on(EVENT_VIDEO_CHAT_SSC.ACCEPT_CALL_SSC, (payload: any) => {
      this.isAccept = true;
      this.isOnRemoteVideo = true;
      this._startCountCallingTime();
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((stream: any) => {
          clearInterval(this.remainingInterval);
          const call = this.myPeer.call(payload.data.receiverId, this.localStream);
          call.on('stream', (remoteStream) => {
            this.remoteVideo.nativeElement.srcObject = remoteStream;
          });
          call.on('close', () => this.remoteVideo.nativeElement.srcObject = null)
        })
    })
    this.socket.on(EVENT_VIDEO_CHAT_SSC.TURN_OFF_VIDEO_CHAT_SSC, (payload: any) => {
      this.isOnRemoteVideo = payload.data.isOnVideo;
    })
    this.socket.on(EVENT_VIDEO_CHAT_SSC.END_CALL_SSC, (payload: any) => {
      if (this.isReceiverAccept)
        this.socket.emit(EVENT_VIDEO_CHAT_CSS.LEAVE_ROOM_VIDEO_CHAT_CSS, { room: `Channel_call_${this.profile._id}` })
      this.activeModal.close(payload);
    })
  }

  ngOnInit(): void {
    this.remainingInterval = setInterval(() => {
      --this.remainingCallingTime;
      if (this.remainingCallingTime < 0) {
        clearInterval(this.remainingInterval);
        this.chatService.getConversation({ id1: this.profile._id, id2: this.myId }).subscribe({
          next: (res: any) => {
            const senderId = this.myId;
            const userId = this.profile._id;
            this.socket.emit(EVENT_VIDEO_CHAT_CSS.END_CALL_CSS, {
              conversationId: res.data._id,
              senderId,
              data: '00:00:00',
              type: 3,
              userId
            })
          }
        })
        this.activeModal.close();
      }
    }, 1000)
    this.myPeer.on('call', (call: any) => {
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((stream: any) => {
          this.isAccept = true;
          this.isOnRemoteVideo = true;
          clearInterval(this.remainingInterval);
          this._startCountCallingTime();
          call.answer(this.localStream);
          call.on('stream', (remoteStream: any) => {
            this.remoteVideo.nativeElement.srcObject = remoteStream;
            this.remoteStream = remoteStream;
          });
        })
        .catch((err: any) => {
          console.error('Failed to get local stream', err);
        });
    });
  }
  ngAfterViewInit(): void {
    this.requestMediaDevices();
    if (this.isReceiverAccept) {
      this.socket.emit(EVENT_VIDEO_CHAT_CSS.ACCEPT_CALL_CSS, { userId: this.profile._id, receiverId: this.myId })
    }
  }
  ngOnDestroy() {
    this.localStream.getTracks()[0].stop();
    this.localVideo.nativeElement.srcObject = null;
    clearInterval(this.intervalId);
    this.myPeer.on('close', (res: any) => {
    });
    this.myPeer.destroy();
    this.socket.emit(EVENT_VIDEO_CHAT_CSS.LEAVE_ROOM_VIDEO_CHAT_CSS, { room: `Channel_call_${this.myId}` })
  }

  private async requestMediaDevices(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.startLocalVideo();
    // this.localVideo.nativeElement.srcObject = this.localStream
  }
  pauseLocalVideo(): void {
    this.isOnLocalVideo = false;
    const videoTrack = this.localStream.getTracks().find(track => track.kind === 'video');
    videoTrack.enabled = false;
    this.localVideo.nativeElement.srcObject = undefined;
    this._turnOffVideo(false);
  }
  startLocalVideo(): void {
    this.isOnLocalVideo = true;
    const videoTrack = this.localStream.getTracks().find(track => track.kind === 'video');
    videoTrack.enabled = true;
    this.localVideo.nativeElement.srcObject = this.localStream;
    this._turnOffVideo(true);
  }
  endCall() {
    this.localStream.getTracks()[0].stop();
    this.localVideo.nativeElement.srcObject = null;
    this.chatService.getConversation({ id1: this.profile._id, id2: this.myId }).subscribe({
      next: (res: any) => {
        this.conversationId = res.data._id;
        const senderId = (this.isReceiverAccept) ? this.profile._id : this.myId;
        const userId = (this.isReceiverAccept) ? this.myId : this.profile._id;
        this.socket.emit(EVENT_VIDEO_CHAT_CSS.END_CALL_CSS, {
          conversationId: res.data._id,
          senderId,
          data: this.timeString,
          type: 3,
          userId
        })
      }
    })
    if (this.isReceiverAccept)
      this.socket.emit(EVENT_VIDEO_CHAT_CSS.LEAVE_ROOM_VIDEO_CHAT_CSS, { room: `Channel_call_${this.profile._id}` })
    this.activeModal.close();
  }
  mute(event: any, check: boolean) {
    event.preventDefault();
    this.isMute = !check;
    this.localStream.getTracks().find(track => track.kind === 'audio').enabled = check;
    this.localVideo.nativeElement.srcObject = this.localStream
  }
  private _turnOffVideo(check: boolean) {
    this.socket.emit(EVENT_VIDEO_CHAT_CSS.TURN_OFF_VIDEO_CHAT_CSS, { userId: this.profile._id, isOnVideo: check })
  }
  private _setTime() {
    const date = new Date(0);
    date.setSeconds(this.callingTime);
    this.timeString = date.toISOString().substring(11, 19);
  }
  private _startCountCallingTime() {
    this.intervalId = setInterval(() => {
      this.callingTime++;
      this._setTime();
    }, 1000)
  }
}
