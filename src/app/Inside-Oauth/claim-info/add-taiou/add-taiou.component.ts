import { Component } from '@angular/core';
import {InsideService} from "../../Inside.service";
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import * as firebase from 'firebase'
import {OauthInfoService} from "../../oauth-info.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-taiou',
  templateUrl: './add-taiou.component.html',
  styleUrls: ['./add-taiou.component.css']
})
export class AddTaiouComponent  {
name:string;
siten:string;
busyo:string;
taiousyubetu:string;
  syubetuvalue:string;
  naiyou:string;
  password:string;

  model;
  claimInfo: FirebaseObjectObservable<any[]>;
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

 uid:string;
  myForm: FormGroup;
  claimInfo2: FirebaseListObservable<any[]>;
  public constructor(private fb: FormBuilder,private oauthInfoService:OauthInfoService,private af : AngularFire,private insideService:InsideService) {
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
this.taiouSyubetuList=this.insideService.taiouList;
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

  addTaiouSyubetu(){
this.taiouSyubetu=[];
   // console.log(this.syubetuvalue)
    this.taiouSyubetu.push(this.syubetuvalue)
    for(let key in this.taiouSyubetuList){
      this.taiouSyubetu.push(this.taiouSyubetuList[key].taiou)
    // console.log(this.taiouSyubetuList[key].taiou)
    }

   // console.log(this.taiouSyubetu)


    const taiouInfo = {
       taiouInfo:this.taiouSyubetu

     };
     this.claimInfo=this.af.database.object('selectData/'+this.uid+'/')
     this.claimInfo.update(taiouInfo).then(data=>{
       console.log('success')
     }).catch(error=>{

     })
  }

  onAdd(){
    const claimInfo = {
      syubetu:this.taiousyubetu,
      name:this.name,
      gaiyou:this.siten,
      siten:this.busyo,
     taioubi:this.dt,
      naiyou:this.naiyou,
      password:this.password,
      koukai:this.model.label,
      startAt: firebase.database.ServerValue.TIMESTAMP,
      updateAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.claimInfo2=this.af.database.list('TaiouData/'+this.uid)
    this.claimInfo2.push(claimInfo).then(data=>{

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
