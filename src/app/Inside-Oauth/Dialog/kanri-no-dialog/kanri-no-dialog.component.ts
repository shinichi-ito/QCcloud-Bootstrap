import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-kanri-no-dialog',
  templateUrl: './kanri-no-dialog.component.html',
  styleUrls: ['./kanri-no-dialog.component.css']
})
export class KanriNoDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  constructor() { }

  ngOnInit() {
  }
  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }
}
