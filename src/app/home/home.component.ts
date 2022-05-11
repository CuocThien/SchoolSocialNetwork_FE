import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as io from 'socket.io-client';
import { IncomingCallComponent } from '../popup/incoming-call/incoming-call.component';
import { VideoChatComponent } from '../popup/video-chat/video-chat.component';
import { EVENT_VIDEO_CHAT_CSS } from '../socket-event/client/video-chat';
import { EVENT_VIDEO_CHAT_SSC } from '../socket-event/server/video-chat';
import { HOST } from '../utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/sass/main.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,

  ) {
    this.socket = io.io(`${HOST}`);
    this.socket.on(EVENT_VIDEO_CHAT_SSC.JOIN_ROOM_VIDEO_CHAT_SSC, (payload: any) => {
      this.modalRef = this.modalService.open(IncomingCallComponent, {
        backdrop: 'static',
        size: 'sm',
        centered: true,
      });
      this.modalRef.componentInstance.profile = payload.data?.profile;
      this.modalRef.result.then((res: any) => {
        this.modalRef = this.modalService.open(VideoChatComponent, {
          backdrop: 'static',
          size: 'lg',
          centered: false,
          fullscreen: true
        });
        this.modalRef.componentInstance.profile = res;
        this.modalRef.componentInstance.isReceiverAccept = true;
        this.modalRef.result.then((res: any) => {
          console.log("🐼 => HomeComponent => res", res)

        }).catch((err: any) => {
          console.log("🐼 => HomeComponent => err", err)
        });

      }).catch((err: any) => {
        console.log("🐼 => HomeComponent => err", err)
      });
    });
  }
  socket: any;

  faArrow = faAngleLeft;
  isOpen = true;
  profile: any;
  screenWidth: any;
  isLangEn = false;

  listRouteNav = [];
  listStrNav = [];

  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.profile = JSON.parse(localStorage.getItem('profile') || '');

    this.socket.emit(EVENT_VIDEO_CHAT_CSS.JOIN_ROOM_VIDEO_CHAT_CSS, {
      userId: this.profile._id,
      callerId: this.profile._id
    })

    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.listRouteNav = JSON.parse(localStorage.getItem('listNav')) || [];
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.listRouteNav = JSON.parse(localStorage.getItem('listNav')) || [];
  }
  openOrCloseSidebar(event: any) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
    this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 680) {
      this.isOpen = false
      this.faArrow = this.isOpen ? faAngleLeft : faAngleRight;
    }
  }
  getSubNav(event: any) {
    this.listRouteNav = event
    localStorage.setItem('listNav', JSON.stringify(event));
  }
  redirectTo(link: any, index: any) {
    if (link != '') {
      this.listRouteNav.splice(index + 1, this.listRouteNav.length - index - 1)
    }
    if (link === '') {
      link = this.router.url;
    }
    localStorage.setItem('listNav', JSON.stringify(this.listRouteNav));
    localStorage.setItem('check', 'true');
    this.router.navigate([link])
  }
}
