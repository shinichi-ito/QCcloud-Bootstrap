import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-error-out-dialog',
  templateUrl: './error-out-dialog.component.html',
  styleUrls: ['./error-out-dialog.component.css']
})
export class ErrorOutDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() errorData;//親コンポーネントから受取る属性
  constructor() { }

  ngOnInit() {
  }
  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
}
