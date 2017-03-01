import { Component } from '@angular/core';
import {InsideService} from "../../Inside.service";
import {OauthInfoService} from "../../oauth-info.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from "angularfire2";
import * as firebase from 'firebase'
import {InsideMainService} from "../../inside-main.service";

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent  {
  public mytime: Date = new Date();
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
  memberList:any[]=[];
  syubetus:any[]=[];
  syubetu:string;
  seihin:string;
  gaiyou:string;
  toukousyaData:any;
  name:string;
  siten:string;
  busyo:string;
  branch:string;
  password:string;
  uid:string;
  koukai:number=0;
  moto:string='';
  basyo:string='';
  syousai:string='';
  seihininfo:string='';
  yosoukoutei:string='';
  syubetuvalue:string='';
  model;
  claimInfo: FirebaseListObservable<any[]>;
  claimInfo2: FirebaseObjectObservable<any[]>;
  myForm: FormGroup;

  public constructor(private af : AngularFire,private insideService:InsideService,
                     private fb: FormBuilder,private oauthInfoService:OauthInfoService,
                      private insideMainService:InsideMainService) {
    this.syubetus=this.insideService.syubetuList;
    this.model = {
      label: "kari"
    };
    this.memberList=this.insideService.memberList;
    this.uid=this.oauthInfoService.uid;
    this.getKey();
    this.myForm = this.fb.group({
      "syubetu": ['',
        Validators.required
      ],
      "seihin": ['',Validators.compose([
          Validators.required
        ]
      )],
      "gaiyou": ['',
        Validators.required
      ],
      "toukousya": ['',Validators.compose([
          Validators.required
        ]
      )],
      "branch": [''],
      "syubetuvalue":[''],
      "password": ['',Validators.compose([
          Validators.required
        ]
      )]
    });

   (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
 }
  secondAdd(){
    const claimInfo = {
      syubetu:this.syubetu,
      seihin:this.seihin,
      gaiyou:this.gaiyou,
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
    this.claimInfo2=this.af.database.object('ClaimData/'+this.uid+'/'+this.insideService.key)
    this.claimInfo2.update(claimInfo).then(data=>{
    }).catch(error=>{

    })
 }

  getKey(){
    return this.insideService.key;
}


setMember(value){
//  console.log(this.toukousyaData);
  for(let key in this.memberList){
  //  console.log(this.memberList[key].key)
    if(this.memberList[key].key==value){
    console.log(this.name=this.memberList[key].siten);
      this.name=this.memberList[key].name;
      this.siten=this.memberList[key].siten;
      this.busyo=this.memberList[key].busyo;
    }
  }

}
  onAdd(){
    const claimInfo = {
      syubetu:this.syubetu,
      seihin:this.seihin,
      gaiyou:this.gaiyou,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      password:this.password,
      koukai:this.model.label,
      taiou:0,
      taioufile:0,
      genin:0,
      geninfile:0,
      taisaku:0,
      taisakufile:0,
      kouka:0,
      koukafile:0,
      comment:0,

      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };

    this.claimInfo=this.af.database.list('ClaimData/'+this.uid)
    this.claimInfo.push(claimInfo).then(data=>{
     // console.log(data.key)
      this.insideService.key=data.key

    }).catch(error=>{

    })

  }


  addSyubetu(){

    this.insideMainService.addSelect(this.uid,this.syubetuvalue,this.name).then(data=>{

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
