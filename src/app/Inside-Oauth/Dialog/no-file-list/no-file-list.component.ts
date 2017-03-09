import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-no-file-list',
  templateUrl: './no-file-list.component.html',
  styleUrls: ['./no-file-list.component.css']
})
export class NoFileListComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  constructor() { }

  ngOnInit() {
  }
//ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
}
