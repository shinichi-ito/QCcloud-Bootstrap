import { Component } from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase'
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {InsideMainService} from "../../../inside-main.service";
@Component({
  selector: 'app-input-taiou',
  templateUrl: './input-taiou.component.html',
  styleUrls: ['./input-taiou.component.css']
})
export class InputTaiouComponent  {
  name:string;
  siten:string;
  busyo:string;
  taiousyubetu:string;
  syubetuvalue:string;
  naiyou:string;
  password:string;

  model;
  claimInfo: FirebaseObjectObservable<any[]>;
  claimInfo2: FirebaseListObservable<any[]>;
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;
  taiouSyubetu:any[]=[];
  memberList:any[]=[];
  taiouSyubetuList:any[]=[];
InfoData:any[]=[];
  uid:string;
  myForm: FormGroup;
  claimList:any[]=[];

 // key:string;
  claimitem:any;
  public constructor(private insideMainService:InsideMainService,private fb: FormBuilder,private oauthInfoService:OauthInfoService,
                     private af : AngularFire,private insideService:InsideService) {
    this.model = {
      label: "kari"
    };
    this.myForm = this.fb.group({
      "taiousyubetu": ['',
        Validators.required
      ],
      "syubetuvalue": [''],
      "toukousya": ['',
        Validators.required
      ],
      "branch": [''],
      "dt": [''],
      "naiyou": ['',Validators.compose([
          Validators.required
        ]
      )],
      "password": ['',Validators.compose([
          Validators.required
        ]
      )],
      "label": ['']

    });

    this.uid=this.oauthInfoService.uid;
    this.taiouSyubetuList=this.insideService.taiouSyubetuList;
    // this.key=this.insideService.claimitem.key;
this.claimitem=this.insideService.claimitem;


    this.memberList=this.insideService.memberList;
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }

  // addTaiouSyubetu(){
  //   this.taiouSyubetu=[];
  //   // console.log(this.syubetuvalue)
  //   this.taiouSyubetu.push(this.syubetuvalue)
  //   for(let key in this.taiouSyubetuList){
  //     this.taiouSyubetu.push(this.taiouSyubetuList[key].taiou)
  //     // console.log(this.taiouSyubetuList[key].taiou)
  //   }
  //
  //   // console.log(this.taiouSyubetu)
  //
  //
  //   const taiouInfo = {
  //     taiouInfo:this.taiouSyubetu
  //
  //   };
  //   this.claimInfo=this.af.database.object('selectData/'+this.uid+'/')
  //   this.claimInfo.update(taiouInfo).then(data=>{
  //     console.log('success')
  //   }).catch(error=>{
  //
  //   })
  // }

  onAdd(){
    console.log(this.dt)
    let time=this.dt.getTime()
    const claimInfo = {
      syubetu:this.taiousyubetu,
      name:this.name,
      siten:this.siten,
      busyo:this.busyo,
      taioubi:time,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      claimkey:this.claimitem.key,
      startAt: firebase.database.ServerValue.TIMESTAMP,
   //   updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.claimInfo2=this.af.database.list('TaiouData/'+this.uid)
    this.claimInfo2.push(claimInfo).then(data=>{
   //   console.log(data.key)
     this.addTaiouSu()
     this.InfoData.push({jyoukyoukey:data.key,toukousya:this.name,siten:this.siten,busyo:this.busyo,claimkey:this.claimitem.key,doko:'対応',naiyou:this.naiyou})
     this.insideService.InfoData=this.InfoData;
     // console.log(this.insideService.InfoData[0])

    }).catch(error=>{

    })
  }


  addTaiouSu(){//クレーム情報の対応数をプラス
    this.claimList=this.insideService.claimList;
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
      //  console.log(this.claimList[key].taiou)

        const claimInfo = {
          taiou:this.claimList[key].taiou+1,
          taiouUp:firebase.database.ServerValue.TIMESTAMP
         // updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })


      }
    }




  }

  addTaiouSyubetu(){

    this.insideMainService.addTaiouSelect(this.uid,this.syubetuvalue,this.name).then(data=>{

    }).catch(error=>{

    })
  }

  setMember(value){
    for(let key in this.memberList){
      if(this.memberList[key].key==value){
        //  console.log(this.name=this.memberList[key].name);
        this.name=this.memberList[key].name;
        this.siten=this.memberList[key].siten;
        this.busyo=this.memberList[key].busyo;
      }
    }

  }
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public open(): void {
    this.opened = !this.opened;
  }

}
