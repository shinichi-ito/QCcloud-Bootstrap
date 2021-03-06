import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {TaisakuDialogComponent} from "../../../Dialog/edit-dialog/taisaku-dialog/taisaku-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {TaisakuDeleteDialogComponent} from "../../../Dialog/delete-dialog/taisaku-delete-dialog/taisaku-delete-dialog.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";
@Component({
  selector: 'app-list-taisaku',
  templateUrl: './list-taisaku.component.html',
  styleUrls: ['./list-taisaku.component.css']
})
export class ListTaisakuComponent implements OnInit {
  taisakuList:any[]=[];
  newtaisakuList:any[]=[];
  index:number;
  taisakuData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
  OnOff:boolean=false;
  taisakus: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  InfoData:any[]=[];
  fileList:any[]=[];
  newfileList:any[]=[];
  jyoukyouData;
//key:string;
  passwordData:any[]=[];
  key:string;
  Data2:any[]=[];
  taisakuSyubetuList:any[]=[];
  @ViewChild("editTaisakuDialog") taisakuDialogComponent: TaisakuDialogComponent;
  @ViewChild("deleteTaisakuDialog") taisakuDeleteDialogComponent: TaisakuDeleteDialogComponent;
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  fileData:any[]=[];
  typeData:any;
  onoffData:boolean;
  dataup:boolean;

  constructor(private insideMainService:InsideMainService,private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.dataup=this.insideMainService.dataup;
    this.uid=this.oauthInfoService.uid;
    //this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
    this.insideService.flagChangeTaisaku$.subscribe(
      flag => {
        //  console.log('対策');
        this.taisakuList=[];
        this.newtaisakuList=[];
        this.taisakuList=this.insideService.taisakuList
        for(let key in this.taisakuList){
          if(this.claimitem.key==this.taisakuList[key].claimkey){
            this.newtaisakuList.push(this.taisakuList[key])
          }
        }

      });
    this.insideService.flagChangeTaisakuDelete$.subscribe(
      flag => {
        this.key=this.insideMainService.taisakukey
        this.Data2=this.insideMainService.taisakuData;
        //console.log(this.Data2)
        for(let key in this.Data2){

          //  console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
            this.Data2.splice(Number(key),1);
          }
        }
        this.newtaisakuList=this.Data2;
      })

  }

  ngOnInit() {
    this.taisakuList=this.insideService.taisakuList;
    for(let key in this.taisakuList){
      if(this.claimitem.key==this.taisakuList[key].claimkey){
        this.newtaisakuList.push(this.taisakuList[key])
      }
    }
    this.fileList=this.insideService.fileList;
    for(let key in this.fileList){
      //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='恒久対策'){
        this.newfileList.push(this.fileList[key])
      }
    }

  }

  // View(index){
  //   this.OnOff=!this.OnOff;
  //   this.index=index;
  //   this.taisakuData=this.newtaisakuList[index];
  //   this.insideService.shareData=this.taisakuData;
  //   // console.log(this.taiouData.key)
  //   let jyoukyouData:any[]=[];
  //   let passwordData:any[]=[];
  //   for(let key in this.newfileList){
  //
  //     // console.log(this.newfileList[key].jyoukyoukey)
  //     if(this.newfileList[key].jyoukyoukey==this.taisakuData.key){
  //       //  console.log(this.newfileList[key].jyoukyoukey)
  //       jyoukyouData.push(this.newfileList[key]);
  //       passwordData.push(this.taisakuData.password)
  //     }
  //   }
  //   this.jyoukyouData=jyoukyouData;
  //   this.insideMainService.jyoukyouData=this.jyoukyouData;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
  //   this.passwordData=passwordData
  // }

  setFile(index){
    this.getFile(index);
  }

  getFile(index){
    this.fileList=[];
    this.newfileList=[];
    let count=0;
    this.fileList=this.insideService.fileList;//再度開きなおしたときFileDataを最新のものを取得したい
    for(let key in this.fileList){

      //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='恒久対策'){
        this.newfileList.push(this.fileList[key])
      }
    }
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    this.insideService.shareData=this.taisakuData;//shareDataは対応や対策で表示されている一覧が入っている
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.taisakuData.key){//jyoukyoukeyとはそのファイルがどの対応や対策に紐づいてるかの対応や対策のキー
        count=count+this.newfileList[key].size;
        this.typeData=this.newfileList[key].type;
        if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
          this.newfileList[key]["downloadURL2"] = this.newfileList[key].downloadURL;
        }else  if (this.typeData.match('application/pdf')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/pdf.png';

        }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Oexcel.png';
        }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Oword.png';
        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Excel.png';
        }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          this.newfileList[key]["downloadURL2"] = 'assets/img/Word.png';
        } else {

          return
        }
        jyoukyouData.push(this.newfileList[key]);
        passwordData.push(this.taisakuData.password)
      }
    }
    // console.log(jyoukyouData)
    // console.log(jyoukyouData.length)
    if(jyoukyouData.length===0){
      this.noFileListComponent.openDialog();
    }else{
      this.fileData=jyoukyouData;
      this.onoffData=true;
      this.passwordData=passwordData;
      this.viewFileComponent.openDialog();
    }
if(count===0){
  console.log('ない')
}else{
  console.log('ある')

  this.insideMainService.onDataUpSuMain(this.uid,count/1024/1024)//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算

}

  }





  addImage(index){

   this.insideMainService.setActive(false);

    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    let jyoukyouData:any[]=[];
    let taisakuData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.taisakuData.key){
        jyoukyouData.push(this.newfileList[key]);
        taisakuData.push(this.taisakuData)
      }
    }
   //  console.log(this.taisakuData)
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.taisakuData.key,toukousya:this.taisakuData.name,
        siten:this.taisakuData.siten,busyo:this.taisakuData.busyo,
        claimkey:this.taisakuData.claimkey,doko:'恒久対策',naiyou:this.taisakuData.naiyou})
      this.insideService.InfoData=this.InfoData

      this.router.navigate(['/main/topclaim/addtaisaku/addimagetaisaku']);
    }else{
      this.InfoData.push({jyoukyoukey:jyoukyouData[0].jyoukyoukey,toukousya:jyoukyouData[0].toukousya,
        siten:jyoukyouData[0].siten,busyo:jyoukyouData[0].busyo,
        claimkey:jyoukyouData[0].claimkey,doko:'恒久対策',naiyou:taisakuData[0].naiyou})
      this.insideService.InfoData=this.InfoData

      this.router.navigate(['/main/topclaim/addtaisaku/addimagetaisaku']);

    }


  }



  setEdit(index){

    this.index=index
    this.taisakuData=this.newtaisakuList[index];
     this.taisakuDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
    this.insideMainService.taisakuData=this.newtaisakuList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.taisakuDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
  }
  addKouka(index){
    this.index=index;
    this.taisakuData=this.newtaisakuList[index];
//console.log(this.taisakuData)
this.insideMainService.koukaFromTaisakudata=this.taisakuData;
    this.router.navigate(['/main/topclaim/addkouka/listkouka'])

  }



  // deleteTaisaku(key:string,uid:string){
  //   this.taisakus=this.af.database.list('TaisakuData/'+this.uid)
  //   this.taisakus.remove(key)
  //     .then(data=>{
  //       this.taisakuList=[];
  //       this.newtaisakuList=[];
  //       this.taisakuList=this.insideService.taisakuList
  //       for(let key in this.taisakuList){
  //         if(this.claimitem.key==this.taisakuList[key].claimkey){
  //           this.newtaisakuList.push(this.taisakuList[key])
  //         }
  //       }
  //       this.minusTaisakuSu()
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  //
  //
  // minusTaisakuSu(){//クレーム情報の対応数をマイナス
  //
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //       let su:number;
  //       su=this.claimList[key].taisaku-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         taisaku:su,
  //         updateAt: firebase.database.ServerValue.TIMESTAMP
  //       };
  //       this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
  //       this.claimInfo.update(claimInfo).then(data=>{
  //
  //       }).catch(error=>{
  //
  //       })
  //     }
  //   }
  // }
  //


}
