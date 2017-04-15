import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() Data;//親コンポーネントから受取る属性
  constructor() { }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
}
