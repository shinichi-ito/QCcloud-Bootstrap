import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-taisaku-dialog',
  templateUrl: './taisaku-dialog.component.html',
  styleUrls: ['./taisaku-dialog.component.css']
})
export class TaisakuDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taisakuData;//親コンポーネントから受取る属性
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  syubetu:string='';
  naiyou:string='';
  pass:string;
  OnOff:boolean=false;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  openDialog() {
    this.modalRef.show();
  }
  onEdit(){
    if(this.taisakuData.password==this.pass){

    if(this.syubetu==''){
      this.syubetu=this.taisakuData.syubetu
     // console.log(this.syubetu)
    }
    if(this.name==''){
      this.name=this.taisakuData.name
    //  console.log(this.name)
    }
    if(this.siten==''){
      this.siten=this.taisakuData.siten
     // console.log(this.siten)
    }
    if(this.busyo==''){
      this.busyo=this.taisakuData.busyo
      //console.log(this.busyo)
    }

    if(this.naiyou==''){
      this.naiyou=this.taisakuData.naiyou
      //console.log(this.syubetu)
    }
    const taisakuInfo = {
       syubetu:this.syubetu,
      name:this.name,
       siten:this.siten,
       busyo:this.busyo,
      naiyou:this.naiyou,
      updateAt: firebase.database.ServerValue.TIMESTAMP,
    };
    this.value = this.af.database.object('TaisakuData/' + this.uid + '/'+this.taisakuData.key);
    this.value.update(taisakuInfo).then(data=>{


       this.modalRef.hide()
     }).catch(error=>{
     })
  }else{

  this.OnOff=true;

}


  }

}
