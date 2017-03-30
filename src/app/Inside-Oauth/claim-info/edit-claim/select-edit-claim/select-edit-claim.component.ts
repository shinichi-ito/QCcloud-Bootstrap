import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideService} from "../../../Inside.service";
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {ClaimDeleteDialogComponent} from "../../../Dialog/claim-delete-dialog/claim-delete-dialog.component";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";

@Component({
  selector: 'app-select-edit-claim',
  templateUrl: './select-edit-claim.component.html',
  styleUrls: ['./select-edit-claim.component.css']
})
export class SelectEditClaimComponent implements OnInit {
  @ViewChild("claimDeleteDialog") claimDeleteDialogComponent: ClaimDeleteDialogComponent;
 // memberList:any[]=[];
  name:string;
  siten:string;
  busyo:string;
  //claimList:any[]=[];
  newclaimList:any[]=[];
//  taiouList:any[]=[];
  newtaiouList:any[]=[];
  password:string;
  OnOff:boolean=false;
  claimitem:any;
  claimData:any;
  Info2: FirebaseObjectObservable<any[]>;
  check:boolean;
  login:number;
  uid:string;

  busyoList:any[]=[];
  sitenList:any[]=[];
  memberList:any[]=[];
  syubetuList:any[]=[];
  taiouSyubetuList:any[]=[];
  taisakuSyubetuList:any[]=[];
  claimList:any[]=[];
  taiouList:any[]=[];
  geninList:any[]=[];
  koukaList:any[]=[];
  commentList:any[]=[];
  taisakuList:any[]=[];
  fileList:any[]=[];
  count:number;
  plusList:number;
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  constructor(private af : AngularFire,private insideMainService:InsideMainService,private router: Router,
              private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.claimitem=this.insideService.claimitem;
   this.uid=this.oauthInfoService.uid;
    this.insideMainService.flagChangeActive$.subscribe((data)=>{
      //console.log('削除');
      this.newclaimList.splice(Number(this.claimData.key),1);
    });

    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    });


    this.check=this.oauthInfoService.check;
    this.login=this.oauthInfoService.login;//その月のログイン回数が入ってくる
   // console.log(this.check);
    if(this.check){
//   //既に一度ログインしているのでこれ以上カウントを増やさない
      this.memberList=this.insideService.memberList;
      this.claimList=this.insideService.claimList;

    }else{
      //ここからログインした際に一気にデータを取得してそのサイズをその月のCheckにプラスしていく
      this.memberList=this.insideService.memberList;
      this.sitenList=this.insideService.sitenList;
      this.busyoList=this.insideService.busyoList;
      this.syubetuList=this.insideService.syubetuList;
      this.taiouSyubetuList=this.insideService.taiouSyubetuList;
      this.taiouSyubetuList=this.insideService.taiouSyubetuList;
      this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
      this.claimList=this.insideService.claimList;
      this.taiouList=this.insideService.taiouList;
      this.taisakuList=this.insideService.taisakuList;
      this.geninList=this.insideService.geninList;
      this.koukaList=this.insideService.koukaList;
      this.commentList=this.insideService.commentList;
      this.fileList=this.insideService.fileList;

      this.plusList=this.insideMainService.getByteLength(JSON.stringify(this.memberList.concat(this.sitenList)
        .concat(this.busyoList).concat(this.syubetuList).concat(this.taiouSyubetuList).concat(this.taisakuSyubetuList)
        .concat(this.claimList).concat(this.taiouList).concat(this.taisakuList).concat(this.geninList).concat(this.koukaList)
        .concat(this.commentList).concat(this.fileList)));
      this.onAddLogin(this.login+this.plusList,this.uid);//その月のログイン時(一覧表示　新規登録　公開前の画面に移ったらデータをすべて取得するからそれにプラスしてそのデータを上乗せする)
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
  Delete(index){
    this.claimData=this.newclaimList[index];
    this.claimDeleteDialogComponent.openDialog();
   //console.log(this.claimData.key)
   //  this.insideMainService.deleteClaim(this.claimData.key,this.uid).then(data=>{
   //    this.newclaimList.splice(Number(this.claimData.key),1);
   //  }).catch(error=>{
   //
   //
   //
   //  });
  }


}
