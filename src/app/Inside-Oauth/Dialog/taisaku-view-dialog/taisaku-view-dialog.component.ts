import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-taisaku-view-dialog',
  templateUrl: './taisaku-view-dialog.component.html',
  styleUrls: ['./taisaku-view-dialog.component.css']
})
export class TaisakuViewDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taisakuData;//親コンポーネントから受取る属性
  constructor() { }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
}
