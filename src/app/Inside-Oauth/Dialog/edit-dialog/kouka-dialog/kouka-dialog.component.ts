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
  aanaiyou:string='';
  bbnaiyou:string='';
  ccnaiyou:string='';
  ddnaiyou:string='';

  aa:number=0;
  bb:number=0;
  cc:number=0;
  dd:number=0;
  pass:string;
  OnOff:boolean=false;
  no:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
  }

  ngOnInit() {

    this.no = [
      {value: ''},
      {value: '1'},
      {value: '2'},
      {value: '3'},
      {value: '4'},
      {value: '5'},
      {value: '6'},
      {value: '7'},
      {value: '8'},
      {value: '9'},
      {value: '10'}
    ];


  }
  openDialog() {
    this.modalRef.show();
  }
  onEdit(){
    if(this.koukaData.password==this.pass){
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
      if(this.aanaiyou==''){
        this.aanaiyou=this.koukaData.aanaiyou
        //console.log(this.syubetu)
      }
      if(this.bbnaiyou==''){
        this.bbnaiyou=this.koukaData.bbnaiyou
        //console.log(this.syubetu)
      }
      if(this.ccnaiyou==''){
        this.ccnaiyou=this.koukaData.ccnaiyou
        //console.log(this.syubetu)
      }
      if(this.ddnaiyou==''){
        this.ddnaiyou=this.koukaData.ddnaiyou
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
      aanaiyou:this.aanaiyou,
      bbnaiyou:this.bbnaiyou,
      ccnaiyou:this.ccnaiyou,
      ddnaiyou:this.ddnaiyou,

      updateAt: firebase.database.ServerValue.TIMESTAMP,
     };
     this.value = this.af.database.object('KoukaData/' + this.uid + '/'+this.koukaData.key);
     this.value.update(Info).then(data=>{

      this.editKoukaTime();
     }).catch(error=>{
     })
    }else{

      this.OnOff=true;

    }
  }

  editKoukaTime() {////クレーム情報に対応した対応や対策のデータが編集されたときタイムをアップする
//console.log('ここ')
    //  console.log(this.claimitem)
    this.claimList = this.insideService.claimList;
    //   console.log(this.claimList)
    for (let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {

        const claimInfo = {
          koukaUp: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo = this.af.database.object('ClaimData/' + this.uid + '/' + this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data => {
          this.modalRef.hide()
        }).catch(error => {

        })


      }
    }

  }




  setAA(value){
    console.log(value)
  }

  setBB(value){
    console.log(value)
  }
  setCC(value){
    console.log(value)
  }

  setDD(value){
    console.log(value)
  }




}
