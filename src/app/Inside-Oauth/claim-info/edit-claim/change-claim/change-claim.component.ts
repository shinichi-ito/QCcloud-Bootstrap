import { Component, OnInit } from '@angular/core';
import {InsideMainService} from "../../../inside-main.service";
import {FirebaseListObservable, FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-change-claim',
  templateUrl: './change-claim.component.html',
  styleUrls: ['./change-claim.component.css']
})
export class ChangeClaimComponent implements OnInit {


//  public mytime: Date = new Date();
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
 // yosoukoutei:string='';
  model;
  check:boolean=false;
  key:string;
  claimInfo: FirebaseListObservable<any[]>;
  claimInfo2: FirebaseObjectObservable<any[]>;

  public constructor(private insideMainService:InsideMainService,private insideService:InsideService,
                     private oauthInfoService:OauthInfoService,private af : AngularFire) {
    this.uid=this.oauthInfoService.uid;
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
    this.claimitem=this.insideMainService.claimData;
    this.key=this.claimitem.key;
    this.syubetu=this.claimitem.syubetu;
    this.seihin=this.claimitem.seihin;
    this.gaiyou=this.claimitem.gaiyou;
    this.syousai=this.claimitem.syousai;
    this.moto=this.claimitem.moto;
    this.basyo=this.claimitem.basyo;
    this.seihininfo=this.claimitem.seihininfo;
  //  this.yosoukoutei=this.claimitem.yosoukoutei;
    this.name=this.claimitem.name;
    this.siten=this.claimitem.siten;
    this.busyo=this.claimitem.busyo;
    this.password2=this.claimitem.password;
    this.dt=this.claimitem.hasseibi;
  //  this.mytime=this.claimitem.hasseiji;


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

    // if(this.yosoukoutei==''){
    //   this.yosoukoutei=this.claimitem.yosoukoutei
    //   //console.log(this.syubetu)
    // }
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
     // hasseiji:this.mytime,
      syousai:this.syousai,
      seihininfo:this.seihininfo,
    //  yosoukoutei:this.yosoukoutei,
      koukai:this.model.label,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.claimInfo2=this.af.database.object('ClaimData/'+this.uid+'/'+this.key)
    this.claimInfo2.update(claimInfo).then(data=>{

    }).catch(error=>{

    })



  }






//以下カレンダー関連のメソッド
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
  public open(): void {
    this.opened = !this.opened;
  }





}
