import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
import {CheckKoukaComponent} from "../../../Dialog/check-kouka/check-kouka.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";

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
  errorData:string='エラー内容'
  @ViewChild("progrssDialog") progressDialogComponent: ProgressDialogComponent;
  Data:string='プログレス内容'
  @ViewChild("checkKoukaDialog") checkKoukaComponent: CheckKoukaComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  fileData:any[]=[];
  date :Date= new Date() ;
  unixTimestampmill:any;
  unixTimestamp:any;
  taisakubi:any;
  OnOff:boolean=false;
  addKouka:number=0;
  claimitem:any;
  typeData:any;
  constructor(private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.taisakuList=this.insideService.taisakuList;
    this.claimitem=this.insideService.claimitem;
    this.unixTimestampmill = this.date.getTime();// 現在のUNIX時間を取得する (ミリ秒単位)
    this.unixTimestamp = this.setTimeChange(this.unixTimestampmill)// 現在のUNIX時間を取得する (秒単位)
   let term:number;
    for(let key in this.taisakuList){
      //1分のタイムスタンプ絶対値（秒）＝60
      //1時間のタイムスタンプ絶対値（秒）＝3600
      //1日のタイムスタンプ絶対値（秒）＝86400
      //30日のタイムスタンプ絶対値（秒）＝2592000
      //三か月のタイムスタンプ絶対値（秒）＝7776000
     // console.log(this.taisakuList[key].koukasu)
      this.taisakubi=this.setTimeChange(this.taisakuList[key].taisakubi)
       term=this.unixTimestamp-this.taisakubi;
       if(term>7&&this.taisakuList[key].koukasu===0){
        this.koukakakuninTaisaku.push(this.taisakuList[key])
        }
     if(this.koukakakuninTaisaku.length>0){
        this.OnOff=true;
        this.addKouka=this.koukakakuninTaisaku.length

}
    }



     // this.data=this.insideService.claimList
    this.newclaimList=this.insideService.claimList
    for(let key in this.newclaimList){
      //  console.log(this.fileList[key].doko)
      if(this.newclaimList[key].koukai=='koukai'){
        this.newclaimList2.push(this.newclaimList[key])
      }
    }
this.data=this.newclaimList2




 }

setFile(item){
   this.getFile(item)
  this.viewFileComponent.openDialog();



}

  getFile(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
    console.log(this.fileList)
     for(let key in this.fileList){
     // console.log(this.fileList[key].claimkey)
  //  console.log(item.key)
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

     this.fileData=jyoukyouData
  //  console.log(this.fileData)
  }



  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
  Error(){
    this.errorDialogComponent.openDialog();
  }
  Progress(){
    this.progressDialogComponent.openDialog();
  }
  sendEditClaim(claimitem){
    this.insideService.claimitem=claimitem;
  //  console.log(claimitem)
    this.oauthInfoService.onoffHeader=false;
    this.router.navigate(['/main/topclaim/topclaimedit'])
   }

  onDetailClick() {

    this.errorDialogComponent.openDialog();
  }
checkKouka(){
  this.checkKoukaComponent.openDialog();


}

  setTimeChange(unixTimestampmill:number){//(ミリ秒単位)から(秒単位)へ
    return Math.floor( unixTimestampmill / 1000 );
  }

}
