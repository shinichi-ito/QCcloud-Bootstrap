import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-kouka-setumei',
  templateUrl: './kouka-setumei.component.html',
  styleUrls: ['./kouka-setumei.component.css']
})
export class KoukaSetumeiComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  constructor() { }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
}
