import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
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
  isOnVideo = true;
  isAccept = false;
  isReceiverAccept = false;
  profile: any;

  constructor() {
    this.myId = JSON.parse(localStorage.getItem('profile'))._id;
    this.socket = io.io(`${HOST}`)
    this.socket.emit(EVENT_VIDEO_CHAT_CSS.JOIN_ROOM_VIDEO_CHAT_CSS, { userId: this.myId })
    this.socket.on(EVENT_VIDEO_CHAT_SSC.ACCEPT_CALL_SSC, (payload: any) => {
      this.isAccept = true;
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((stream: any) => {
          const call = this.myPeer.call(payload.data.receiverId, this.localStream);
          call.on('stream', (remoteStream) => {
            this.remoteVideo.nativeElement.srcObject = remoteStream;
          });
        })
    })
  }
  ngOnChanges() {
    console.log(this.remoteStream)
  }

  ngOnInit(): void {
    this.myPeer = new Peer(`${this.myId}`);
    this.myPeer.on('call', (call: any) => {
      navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then((stream: any) => {
          this.isAccept = true;
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
    this.myPeer.on('close', (res: any) => {
      console.log(res)
    });
  }

  private async requestMediaDevices(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.startLocalVideo();
    // this.localVideo.nativeElement.srcObject = this.localStream
  }
  pauseLocalVideo(): void {
    this.isOnVideo = false;
    const videoTrack = this.localStream.getTracks().find(track => track.kind === 'video');
    videoTrack.enabled = false;
    this.localVideo.nativeElement.srcObject = undefined;
  }
  startLocalVideo(): void {
    this.isOnVideo = true;
    const videoTrack = this.localStream.getTracks().find(track => track.kind === 'video');
    videoTrack.enabled = true;
    this.localVideo.nativeElement.srcObject = this.localStream;
  }
  close() {
    this.localStream.getTracks().forEach(track => {
      track.stop();
    });
  }
  mute(event: any, check: boolean) {
    event.preventDefault();
    this.isMute = !check;
    this.localStream.getTracks().find(track => track.kind === 'audio').enabled = check;
    this.localVideo.nativeElement.srcObject = this.localStream
  }
}
