import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import * as firebase from 'firebase'
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
@Component({
  selector: 'app-kouka-dialog',
  templateUrl: './kouka-dialog.component.html',
  styleUrls: ['./kouka-dialog.component.css']
})
export class KoukaDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() koukaData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  syubetu:string='';
  naiyou:string='';
  aa:number=0;
  bb:number=0;
  cc:number=0;
  dd:number=0;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;

  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  onEdit(){

    if(this.name==''){
      this.name=this.koukaData.name
      //console.log(this.syubetu)
    }
    if(this.siten==''){
      this.siten=this.koukaData.siten
      //console.log(this.syubetu)
    }
    if(this.busyo==''){
      this.busyo=this.koukaData.busyo
      //console.log(this.syubetu)
    }
   if(this.naiyou==''){
      this.naiyou=this.koukaData.naiyou
      //console.log(this.syubetu)
    }
    if(this.aa===0){
      this.aa=this.koukaData.aa;
      //console.log(this.aa)
    }
    if(this.bb===0){
      this.bb=this.koukaData.bb;
      //console.log(this.aa)
    }
    if(this.cc===0){
      this.cc=this.koukaData.cc;
      //console.log(this.aa)
    }
    if(this.dd===0){
      this.dd=this.koukaData.dd;
      //console.log(this.aa)
    }

    const Info = {
      name:this.name,
     siten:this.siten,
      busyo:this.busyo,
      aa:this.aa,
      bb:this.bb,
      cc:this.cc,
      dd:this.dd,
       naiyou:this.naiyou,
      updateAt: firebase.database.ServerValue.TIMESTAMP,
     };
     this.value = this.af.database.object('KoukaData/' + this.uid + '/'+this.koukaData.key);
     this.value.update(Info).then(data=>{

      this.modalRef.hide()
     }).catch(error=>{
     })
  }
}
