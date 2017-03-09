import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() fileData;//親コンポーネントから受取る属性
  constructor() {

  }

  ngOnInit() {
    console.log(this.fileData)





  }
  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }

}
