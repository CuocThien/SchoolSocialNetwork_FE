import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-incoming-call',
  templateUrl: './incoming-call.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class IncomingCallComponent implements OnInit {

  constructor(
    private activeModel: NgbActiveModal
  ) { }

  profile: any;
  ngOnInit(): void {
  }

  accept() {
    this.activeModel.close(this.profile);
  }

  reject() {
    this.activeModel.dismiss('reject');
  }

}
