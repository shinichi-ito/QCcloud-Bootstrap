import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'

@Component({
  selector: 'app-top-claim-edit',
  templateUrl: './top-claim-edit.component.html',
  styleUrls: ['./top-claim-edit.component.css']
})
export class TopClaimEditComponent implements OnInit{
  public mytime: Date = new Date();
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
  claimitem:any;
  syubetu:string;
  seihin:string;
  gaiyou:string;
  name:string='';
  siten:string='';
  busyo:string='';
  password:string='';
  password2:string='';
  uid:string;
  koukai:number=0;
  moto:string='';
  basyo:string='';
  syousai:string='';
  seihininfo:string='';
  yosoukoutei:string='';
  model;
check:boolean=false;
key:string;
claimList:any;
  claimInfo: FirebaseListObservable<any[]>;
  claimInfo2: FirebaseObjectObservable<any[]>;
  OnOff:boolean=false;
  fileList:any;
  newfileList:any;
  jyoukyouData:any;

  public constructor(private insideService:InsideService,private oauthInfoService:OauthInfoService,private af : AngularFire) {



  this.uid=this.oauthInfoService.uid;
  this.claimList=this.insideService.claimList;
    this.model = {
      label: "kari"
    };
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];

    this.claimitem=this.insideService.claimitem;
    this.key=this.claimitem.key;

    for(let key in this.claimList){
      if(this.claimList[key].key==this.key){
       // console.log(this.key)
        this.syubetu=this.claimList[key].syubetu;
        this.seihin=this.claimList[key].seihin;
        this.gaiyou=this.claimList[key].gaiyou;
        this.syousai=this.claimList[key].syousai;
        this.moto=this.claimList[key].moto;
        this.basyo=this.claimList[key].basyo;
        this.seihininfo=this.claimList[key].seihininfo;
        this.yosoukoutei=this.claimList[key].yosoukoutei;
        this.name=this.claimList[key].name;
        this.siten=this.claimList[key].siten;
        this.busyo=this.claimList[key].busyo;
        this.password2=this.claimList[key].password;
        this.dt=this.claimList[key].hasseibi;
        this.mytime=this.claimList[key].hasseiji;
    }
    }
 }
 ngOnInit(){}


  onEdit(){
    if(this.password==this.password2){
      this.check=false;
     }else{
      this.check=true;
    }

    if(this.syubetu==''){
      this.syubetu=this.claimitem.syubetu;
      //  console.log(this.name)
    }

    if(this.seihin==''){
      this.seihin=this.claimitem.seihin;
      //  console.log(this.name)
    }

    if(this.gaiyou==''){
      this.gaiyou=this.claimitem.gaiyou;
      //  console.log(this.name)
    }



    if(this.syousai==''){
      this.syousai=this.claimitem.syousai;
      //  console.log(this.name)
    }

    if(this.moto==''){
      this.moto=this.claimitem.moto;
      //  console.log(this.name)
    }
    if(this.basyo==''){
      this.basyo=this.claimitem.basyo;
      // console.log(this.siten)
    }
    if(this.seihininfo==''){
      this.seihininfo=this.claimitem.seihininfo;
      //console.log(this.busyo)
    }

    if(this.yosoukoutei==''){
      this.yosoukoutei=this.claimitem.yosoukoutei
      //console.log(this.syubetu)
    }
    if(this.name==''){
      this.name=this.claimitem.name
      //  console.log(this.name)
    }
    if(this.siten==''){
      this.siten=this.claimitem.siten
      // console.log(this.siten)
    }
    if(this.busyo==''){
      this.busyo=this.claimitem.busyo
      //console.log(this.busyo)
    }
    const claimInfo = {
      syubetu:this.syubetu,
      seihin:this.seihin,
      gaiyou:this.gaiyou,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      password:this.password,
      moto:this.moto,
      basyo:this.basyo,
      hasseibi:this.dt,
      hasseiji:this.mytime,
      syousai:this.syousai,
      seihininfo:this.seihininfo,
      yosoukoutei:this.yosoukoutei,
      koukai:this.model.label,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.claimInfo2=this.af.database.object('ClaimData/'+this.uid+'/'+this.key)
    this.claimInfo2.update(claimInfo).then(data=>{

    }).catch(error=>{

    })



  }

getFile(){
  let jyoukyouData:any[]=[];
  let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
  this.fileList=this.insideService.fileList
  for(let key in this.fileList){
    //  console.log(this.fileList[key].claimkey)
   // console.log(this.claimitem.key)
    if(this.claimitem.key==this.fileList[key].claimkey){
      jyoukyouData.push(this.fileList[key])
    }
  }
this.jyoukyouData=jyoukyouData
}



//以下カレンダー関連のメソッド
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
  public open(): void {
    this.opened = !this.opened;
  }




}
