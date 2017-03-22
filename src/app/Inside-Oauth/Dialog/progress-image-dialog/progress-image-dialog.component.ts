import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-progress-image-dialog',
  templateUrl: './progress-image-dialog.component.html',
  styleUrls: ['./progress-image-dialog.component.css']
})
export class ProgressImageDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() Data;//親コンポーネントから受取る属性
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
