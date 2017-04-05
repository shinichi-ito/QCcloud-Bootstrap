import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
import {TaisakuSelectComponent} from "../../taisaku-select/taisaku-select.component";
@Component({
  selector: 'app-taisaku-dialog',
  templateUrl: './taisaku-dialog.component.html',
  styleUrls: ['./taisaku-dialog.component.css']
})
export class TaisakuDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taisakuData;//親コンポーネントから受取る属性
  @Input() taisakuSyubetuList;//親コンポーネントから受取る属性
  @ViewChild("selectTaisakuDialog") taisakuSelectComponent: TaisakuSelectComponent;
  value: FirebaseObjectObservable<any>;
  uid:string;
  name:string='';
  siten:string='';
  busyo:string='';
  syubetu:string='';
  naiyou:string='';
  pass:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  taisakusyubetu:string;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
  }

  ngOnInit() {
  }

  close(){
//     this.syubetu='';
//     this.name='';
//   this.siten='';
//   this.busyo='';
//   this.naiyou='';
    this.pass='';
    this.modalRef.hide()
//
  }
  setChange(value){

    if(this.syubetu==''){
      this.syubetu=this.taisakuData.syubetu
    }
    this.syubetu=this.syubetu+'⇒'+value



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
      this.editTaisakuTime()
      this.pass='';
     }).catch(error=>{


     })
  }else{

  this.OnOff=true;

}


  }
  editTaisakuTime() {//クレーム情報に対応した対応や対策のデータが編集されたときタイムをアップする
//console.log('ここ')
    //  console.log(this.claimitem)
    this.claimList = this.insideService.claimList;
    //   console.log(this.claimList)
    for (let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {

        const claimInfo = {
          taisakuUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo = this.af.database.object('ClaimData/' + this.uid + '/' + this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data => {
          this.modalRef.hide()
        }).catch(error => {

        })


      }
    }

  }
  addTaisakuSyubetu(){
    // this.modalRef.hide()
    this.taisakuSelectComponent.openDialog();

  }
}
