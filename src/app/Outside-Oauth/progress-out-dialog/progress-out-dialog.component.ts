import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-progress-out-dialog',
  templateUrl: './progress-out-dialog.component.html',
  styleUrls: ['./progress-out-dialog.component.css']
})
export class ProgressOutDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  constructor() { }

  ngOnInit() {
  }
  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
  closeDialog() {
    this.modalRef.hide();
  }


}
