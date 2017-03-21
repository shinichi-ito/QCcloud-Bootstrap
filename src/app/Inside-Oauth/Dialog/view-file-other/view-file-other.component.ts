import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-view-file-other',
  templateUrl: './view-file-other.component.html',
  styleUrls: ['./view-file-other.component.css']
})
export class ViewFileOtherComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() fileData;//親コンポーネントから受取る属性
  constructor() { }

  ngOnInit() {
  }
//ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
}
