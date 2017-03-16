import { Component, OnInit } from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";

@Component({
  selector: 'app-select-edit-claim',
  templateUrl: './select-edit-claim.component.html',
  styleUrls: ['./select-edit-claim.component.css']
})
export class SelectEditClaimComponent implements OnInit {

  memberList:any[]=[];
  name:string;
  siten:string;
  busyo:string;
  claimList:any[]=[];
  newclaimList:any[]=[];
  taiouList:any[]=[];
  newtaiouList:any[]=[];
  password:string;
  OnOff:boolean=false;
  claimitem:any;
  claimData:any;
  Info2: FirebaseObjectObservable<any[]>;
  check:boolean;
  login:number;
  uid:string;
  constructor(private af : AngularFire,private insideMainService:InsideMainService,private router: Router,
              private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.claimitem=this.insideService.claimitem;
    this.memberList=this.insideService.memberList;
    this.claimList=this.insideService.claimList;

    this.uid=this.oauthInfoService.uid;
    this.check=this.oauthInfoService.check;
    this.login=this.oauthInfoService.login;//その月のログイン回数が入ってくる
    console.log(this.login);
    if(this.check){
//   //既に一度ログインしているのでこれ以上カウントを増やさない
    }else{
      this.onAddLogin(this.login+1,this.uid);
      this.oauthInfoService.check=true;//これをtrueにして　一度ログインしていることを示している
    }



  }

  ngOnInit() {
  }
  setMember(value) {
    for (let key in this.memberList) {
      if (this.memberList[key].key == value) {
        this.name = this.memberList[key].name;
      }
    }
  }
  onAddLogin(count:number,uid:string){//これはログインした際その月のログイン回数に加算する
    const Info = {
      login:count
    };
    this.Info2=this.af.database.object('Check/'+uid+'/'+this.insideService.date2);
    this.Info2.set(Info).then(data=>{
      //   console.log(data.key)


    }).catch(error=>{

    })
  }



  getData(){
//console.log(this.claimList)

    for(let key in this.claimList){
      if(this.claimList[key].name==this.name&&this.claimList[key].koukai=='kari'&&this.claimList[key].password==this.password){
        this.newclaimList.push(this.claimList[key])
      }
    }

    this.OnOff=true;

  }


  setEdit(idx){
    this.claimData=this.newclaimList[idx];
    this.insideMainService.claimData=this.claimData;
    this.router.navigate(['/main/editclaim/changeclaim'])


  }



}
