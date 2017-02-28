import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
import {InsideService} from "../../../Inside.service";
@Component({
  selector: 'app-taiou-dialog',
  templateUrl: './taiou-dialog.component.html',
  styleUrls: ['./taiou-dialog.component.css']
})
export class TaiouDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taiouData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  syubetu:string='';
  naiyou:string='';
  key:string;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
    this.key=this.insideService.claimitem.key;
  }

  ngOnInit() {
  }
  openDialog() {
   this.modalRef.show();
  }
  onEdit(){
   if(this.syubetu==''){
      this.syubetu=this.taiouData.syubetu
      //console.log(this.syubetu)
    }
    if(this.name==''){
      this.name=this.taiouData.name
      //console.log(this.syubetu)
    }
    if(this.siten==''){
      this.siten=this.taiouData.siten
      //console.log(this.syubetu)
    }
    if(this.busyo==''){
      this.busyo=this.taiouData.busyo
      //console.log(this.syubetu)
    }

    if(this.naiyou==''){
      this.naiyou=this.taiouData.naiyou
      //console.log(this.syubetu)
    }
     const taiouInfo = {
      syubetu:this.syubetu,
       name:this.name,
       siten:this.siten,
       busyo:this.busyo,
       naiyou:this.naiyou,
       updateAt: firebase.database.ServerValue.TIMESTAMP,
     };
     this.value = this.af.database.object('TaiouData/' + this.uid + '/'+this.taiouData.key);
    this.value.update(taiouInfo).then(data=>{

        this.modalRef.hide()
     }).catch(error=>{
     })
  }
}
