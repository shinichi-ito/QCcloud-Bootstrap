import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-taikai-check',
  templateUrl: './taikai-check.component.html',
  styleUrls: ['./taikai-check.component.css']
})
export class TaikaiCheckComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() urlData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;

  constructor(private insideMainService:InsideMainService,private af : AngularFire) { }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  taikai(){



  }
}
