import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
import {CheckKoukaComponent} from "../../../Dialog/check-kouka/check-kouka.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";

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
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;

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



 setEdit(claimitem){
   this.insideService.claimitem=claimitem;
   this.oauthInfoService.onoffHeader=false;
   this.router.navigate(['/main/editclaimmain/editclaimdata'])

 }


setFile(item){
   this.getFile(item)
//  this.viewFileComponent.openDialog();



}

  getFile(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
   // console.log(this.fileList)
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
    if(jyoukyouData.length===0){
      this.noFileListComponent.openDialog();
    }else{
      this.fileData=jyoukyouData;
      this.onoffData=false;
      this.viewFileComponent.openDialog();
    }
  }
  setChangeTaiou(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
    // console.log(this.fileList)
    for(let key in this.fileList){
      // console.log(this.fileList[key].claimkey)
      //  console.log(item.key)
      if(item.key==this.fileList[key].claimkey&&this.fileList[key].doko=='対応'){
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
      this.fileData=jyoukyouData;
      this.onoffData=false;
      this.viewFileComponent.openDialog();
    }
  }





  setChangeTaisaku(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
    // console.log(this.fileList)
    for(let key in this.fileList){
      // console.log(this.fileList[key].claimkey)
      //  console.log(item.key)
      if(item.key==this.fileList[key].claimkey&&this.fileList[key].doko=='対策'){
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
      this.fileData=jyoukyouData;
      this.onoffData=false;
      this.viewFileComponent.openDialog();
    }
  }

  setChangeGenin(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
    // console.log(this.fileList)
    for(let key in this.fileList){
      // console.log(this.fileList[key].claimkey)
      //  console.log(item.key)
      if(item.key==this.fileList[key].claimkey&&this.fileList[key].doko=='原因'){
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
      this.fileData=jyoukyouData;
      this.onoffData=false;
      this.viewFileComponent.openDialog();
    }
  }


  setChangeKouka(item){
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    this.OnOff=!this.OnOff;
    this.fileList=this.insideService.fileList
    // console.log(this.fileList)
    for(let key in this.fileList){
      // console.log(this.fileList[key].claimkey)
      //  console.log(item.key)
      if(item.key==this.fileList[key].claimkey&&this.fileList[key].doko=='効果'){
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
      this.fileData=jyoukyouData;
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
      taiouList[key]['sort']=taiouList[key].taioubi;
      newtaiouList.push(taiouList[key])
    }
  }
  for(let key in taisakuList){
    if(item.key==taisakuList[key].claimkey){
      taisakuList[key]['doko']='対策';
      taisakuList[key]['sort']=taisakuList[key].taisakubi;
      newtaisakuList.push(taisakuList[key])
    }
  }

  for(let key in geninList){
    if(item.key==geninList[key].claimkey){
      geninList[key]['doko']='原因';
      newgeninList.push(geninList[key])
    }
  }

  for(let key in koukaList){
    if(item.key==koukaList[key].claimkey){
      koukaList[key]['doko']='効果';
      koukaList[key]['sort']=koukaList[key].kakuninbi;
      newkoukaList.push(koukaList[key])
    }
  }

  let array = newtaiouList.concat(newtaisakuList).concat(newgeninList).concat(newkoukaList);
  array.sort((a,b)=>{
    if(a.sort<b.sort) return -1;
    if(a.sort > b.sort) return 1;
    return 0;
  });
  console.log(array)




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
    //this.oauthInfoService.onoffHeader=false;
   this.router.navigate(['/main/topclaim/addtaiou/listtaiou'])
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
