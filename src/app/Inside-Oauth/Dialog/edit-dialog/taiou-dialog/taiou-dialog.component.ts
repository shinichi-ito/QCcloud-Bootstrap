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
//  key:string;
  pass:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
    //this.key=this.insideService.claimitem.key;
  }

  ngOnInit() {
  }
  openDialog() {
   this.modalRef.show();
  }
  onEdit(){
    if(this.taiouData.password==this.pass){

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
        this.editTaiouTime()

      }).catch(error=>{
      })
    }else{

      this.OnOff=true;

    }


  }

  editTaiouTime() {////クレーム情報に対応した対応や対策のデータが編集されたときタイムをアップする
//console.log('ここ')
    //  console.log(this.claimitem)
    this.claimList = this.insideService.claimList;
    //   console.log(this.claimList)
    for (let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {

        const claimInfo = {
          taiouUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo = this.af.database.object('ClaimData/' + this.uid + '/' + this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data => {
          this.modalRef.hide()
        }).catch(error => {

        })


      }
    }

  }

}
