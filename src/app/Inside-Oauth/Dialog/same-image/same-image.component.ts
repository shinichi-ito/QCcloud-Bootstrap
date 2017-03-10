import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {InsideService} from "../../Inside.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-same-image',
  templateUrl: './same-image.component.html',
  styleUrls: ['./same-image.component.css']
})
export class SameImageComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() fileSameList;//親コンポーネントから受取る属性


  constructor(private insideService:InsideService) { }

  ngOnInit() {

  }

  //ダイアログを開く
  openDialog() {
    this.modalRef.show();
  }

reset(){
this.fileSameList=[]

  this.modalRef.hide();

}

}
