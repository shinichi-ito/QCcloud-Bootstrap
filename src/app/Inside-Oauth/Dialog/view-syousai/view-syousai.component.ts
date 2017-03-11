import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";

@Component({
  selector: 'app-view-syousai',
  templateUrl: './view-syousai.component.html',
  styleUrls: ['./view-syousai.component.css']
})
export class ViewSyousaiComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() claimItem;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';

  naiyou:string='';
  key:string;
  pass:string;
  OnOff:boolean=false;
  claimList:any[]=[];
 claimitem:any;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {

  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }

}
