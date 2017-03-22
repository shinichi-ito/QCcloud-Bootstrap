import {Component, ViewChild} from '@angular/core';
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {Router} from "@angular/router";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {CheckKoukaComponent} from "../../../Dialog/check-kouka/check-kouka.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";
import {InsideMainService} from "../../../inside-main.service";
import {ViewSyousaiComponent} from "../../../Dialog/view-syousai/view-syousai.component";
import {KoukaSetumeiComponent} from "../../../Dialog/kouka-setumei/kouka-setumei.component";


@Component({
  selector: 'app-claim-list-all',
  templateUrl: './claim-list-all.component.html',
  styleUrls: ['./claim-list-all.component.css']
})
export class ClaimListAllComponent  {
  fileList:any;
  public data;
  newclaimList;
  newclaimList2:any[]=[];
  public data2;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";
taisakuList:any;
koukakakuninTaisaku:any[]=[];
   @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  // @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  // Data:string='プログレス内容'

  @ViewChild("checkKoukaDialog") checkKoukaComponent: CheckKoukaComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
  @ViewChild("syousaiDialog") viewSyousaiComponent: ViewSyousaiComponent;
  @ViewChild("koukaSetumeiDialog") koukaSetumeiComponent: KoukaSetumeiComponent;
  timeLineData:any[]=[];
  fileData:any[]=[];
  typeData:any;
  onoffData:boolean;
  date :Date= new Date() ;
  unixTimestampmill:any;
  unixTimestamp:any;
  taisakubi:any;
  OnOff:boolean=false;
  addKouka:number=0;
  claimitem:any;
  InfoData:any[]=[];
  claimItem:any;
  Info2: FirebaseObjectObservable<any[]>;
  uid:string;
  check:boolean;
  login:number;
  countOnOff:boolean=false;
  //checkList:any[]=[];
 // checkPlan:any[]=[];
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

count:number;
plusList:number;



  constructor(private insideMainService:InsideMainService,private router: Router,
              private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {

    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();

    });



  this.uid=this.oauthInfoService.uid;
this.check=this.oauthInfoService.check;//既にログインしてから一度カウントをアップしたかチェック
    this.login=this.oauthInfoService.login;//その月のログインした際の一気にファイルを取得した際のサイズが入っている
//console.log(this.check);
 if(this.check){
//   //既に一度ログインしているのでこれ以上カウントを増やさない
   this.claimList=this.insideService.claimList;
   this.taisakuList=this.insideService.taisakuList;
   this.fileList=this.insideService.fileList;
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
//console.log(this.plusList)
//console.log(this.login)
  this.onAddLogin(this.login+this.plusList,this.uid);//その月のログイン時(一覧表示　新規登録　公開前の画面に移ったらデータをすべて取得するからそれにプラスしてそのデータを上乗せする)
    this.oauthInfoService.check=true;//これをtrueにして　一度ログインしていることを示している
   }


this.topWork()

}
  onAddLogin(count:number,uid:string){//これはログインした際データを一気に取得するので何メガバイト取得し更に保存上乗せ
    const Info = {
      login:count
    };
    this.Info2=this.af.database.object('Check/'+uid+'/'+this.insideService.date2);
    this.Info2.set(Info).then(data=>{
    }).catch(error=>{
      this.errorData='データ取得に失敗しました。再ログインしてください';
      this.errorDialogComponent.openDialog();

    })
  }
Description(){
this.koukaSetumeiComponent.openDialog();
}

  topWork(){
    this.newclaimList=this.claimList;//クレーム一覧から公開になってるものを選択表示



    for(let key in this.newclaimList){
      if(this.newclaimList[key].koukai=='koukai'){
        this.newclaimList2.push(this.newclaimList[key])
      }
    }
    this.data=this.newclaimList2;

  //  this.taisakuList=this.insideService.taisakuList;//対策リスト内に　三か月たっても効果確認がされてないものを探し出す
    this.claimitem=this.insideService.claimitem;
    this.unixTimestampmill = this.date.getTime();// 現在のUNIX時間を取得する (ミリ秒単位)
    this.unixTimestamp = this.setTimeChange(this.unixTimestampmill);// 現在のUNIX時間を取得する (秒単位)
    let term:number;

    for(let key in this.taisakuList){//対策リスト内に　三か月たっても効果確認がされてないものを探し出す
      //1分のタイムスタンプ絶対値（秒）＝60
      //1時間のタイムスタンプ絶対値（秒）＝3600
      //1日のタイムスタンプ絶対値（秒）＝86400
      //30日のタイムスタンプ絶対値（秒）＝2592000
      //三か月のタイムスタンプ絶対値（秒）＝7776000
      // console.log(this.taisakuList[key].koukasu)
      this.taisakubi=this.setTimeChange(this.taisakuList[key].taisakubi)
      term=this.unixTimestamp-this.taisakubi;
      if(term>7776000&&this.taisakuList[key].koukasu===0){
        this.koukakakuninTaisaku.push(this.taisakuList[key])
      }
      if(this.koukakakuninTaisaku.length>0){
        this.OnOff=true;
        this.addKouka=this.koukakakuninTaisaku.length
      }
    }
  }




  viewSyousai(claimitem){
    //console.log(claimitem)
    this.claimItem=claimitem;
    this.viewSyousaiComponent.openDialog();

  }

 setEdit(claimitem){
   this.insideService.claimitem=claimitem;
 //  this.oauthInfoService.onoffHeader=false;
   this.router.navigate(['/main/editclaimmain/editclaimdata'])

 }


setFile(item){
   this.getFile(item);
}

  getFile(item){
  let count=0;
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
  //  this.OnOff=!this.OnOff;
 //   this.fileList=this.insideService.fileList
   // console.log(this.fileList)
     for(let key in this.fileList){
     //  console.log(this.fileList[key].size)
       count=count+this.fileList[key].size;
    //   console.log(count)
       if(item.key==this.fileList[key].claimkey){
           this.typeData=this.fileList[key].type;
           if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
             this.fileList[key]["downloadURL2"] = this.fileList[key].downloadURL;
           }else  if (this.typeData.match('application/pdf')) {
             this.fileList[key]["downloadURL2"] = 'assets/img/pdf.png';

           }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
             this.fileList[key]["downloadURL2"] = 'assets/img/Oexcel.png';
           }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
             this.fileList[key]["downloadURL2"] = 'assets/img/Oword.png';
           }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
             this.fileList[key]["downloadURL2"] = 'assets/img/Excel.png';
           }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
             this.fileList[key]["downloadURL2"] = 'assets/img/Word.png';
           } else {

             return
           }
              jyoukyouData.push(this.fileList[key])
       }
     }
    if(jyoukyouData.length===0){
      this.noFileListComponent.openDialog();
    }else{
      this.insideMainService.onDataUpSuMain(this.uid,count/1024/1024)//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算
      this.fileData=jyoukyouData;
      this.insideMainService.fileData=this.fileData;//ファイル一覧のダイアログで対応や対策のファイルを絞り込むために一旦　べつに保管
      this.onoffData=false;
      this.viewFileComponent.openDialog();
    }
  }


  addImage(index){

    this.InfoData.push({
      toukousya: index.name,
       siten: index.siten, busyo: index.busyo,
       claimkey: index.key, doko: 'クレーム', naiyou: index.gaiyou,jyoukyoukey:index.key
     })
     this.insideService.InfoData = this.InfoData


    this.router.navigate(['/main/editclaimmain/addimageclaim']);




  }



setTimeLine(item){
  this.insideService.claimitem=item;
 //   console.log(item.key)
  let timeLineData:any[]=[];
    let taiouList:any[]=[];
    let taisakuList:any[]=[];
    let geninList:any[]=[];
    let koukaList:any[]=[];
  let newtaiouList:any[]=[];
  let newtaisakuList:any[]=[];
  let newgeninList:any[]=[];
  let newkoukaList:any[]=[];
    taiouList=this.insideService.taiouList;
  taisakuList=this.insideService.taisakuList;
  geninList=this.insideService.geninList;
  koukaList=this.insideService.koukaList;
  for(let key in taiouList){
    if(item.key==taiouList[key].claimkey){
      taiouList[key]['doko']='対応';
      taiouList[key]['check']='';
      taiouList[key]['color']='timeline-badge warning';
      taiouList[key]['icon']="fa fa-university";
      taiouList[key]['sort']=taiouList[key].taioubi;
      newtaiouList.push(taiouList[key])
    }
  }
  for(let key in taisakuList){
    if(item.key==taisakuList[key].claimkey){
      taisakuList[key]['doko']='対策';
      taisakuList[key]['check']='';
      taisakuList[key]['color']='timeline-badge primary';
      taisakuList[key]['icon']="fa fa-thermometer-three-quarters";
      taisakuList[key]['sort']=taisakuList[key].taisakubi;
      newtaisakuList.push(taisakuList[key])
    }
  }

  for(let key in geninList){
    if(item.key==geninList[key].claimkey){
      geninList[key]['doko']='原因';
      geninList[key]['check']='timeline-inverted';
      geninList[key]['color']='timeline-badge success';
      geninList[key]['icon']="fa fa-id-card";
      geninList[key]['sort']=geninList[key].kakuninbi;
      newgeninList.push(geninList[key])
    }
  }

  for(let key in koukaList){
    if(item.key==koukaList[key].claimkey){
      koukaList[key]['doko']='効果';
      koukaList[key]['check']='timeline-inverted';
      koukaList[key]['color']='timeline-badge info';
      koukaList[key]['icon']="fa fa-check-square-o";
      koukaList[key]['sort']=koukaList[key].kakuninbi;
      newkoukaList.push(koukaList[key])
    }
  }
//配列つないで
  let array = newtaiouList.concat(newtaisakuList).concat(newgeninList).concat(newkoukaList);
  array.sort((a,b)=>{
    if(a.sort<b.sort) return -1;
    if(a.sort > b.sort) return 1;
    return 0;
  });
this.insideMainService.timelineData=array;
  this.router.navigate(['/main/viewtimeline'])






}








  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
  // Error(){
  //   this.errorDialogComponent.openDialog();
  // }
  // Progress(){
  //   this.progressDialogComponent.openDialog();
  // }


  sendEditClaim(claimitem){
    this.insideService.claimitem=claimitem;
  //  console.log(claimitem)
    //this.oauthInfoService.onoffHeader=false;
   this.router.navigate(['/main/topclaim/addtaiou/listtaiou'])
   }

  sendEditTaiou(claimitem){
    this.insideService.claimitem=claimitem;
    //  console.log(claimitem)
    //this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/addtaiou/listtaiou'])
  }
  sendEditTaisaku(claimitem){
    this.insideService.claimitem=claimitem;
    //  console.log(claimitem)
    //this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/addtaisaku/listtaisaku'])
  }
  sendEditGenin(claimitem){
    this.insideService.claimitem=claimitem;
    //  console.log(claimitem)
    //this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/addgenin/listgenin'])
  }
  sendEditComment(claimitem){
    this.insideService.claimitem=claimitem;
    //  console.log(claimitem)
    //this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/addcomment/listcomment'])
  }


  // onDetailClick() {
  //
  //   this.errorDialogComponent.openDialog();
  // }
checkKouka(){
  this.checkKoukaComponent.openDialog();


}

  setTimeChange(unixTimestampmill:number){//(ミリ秒単位)から(秒単位)へ
    return Math.floor( unixTimestampmill / 1000 );
  }

}
