import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {GeninDialogComponent} from "../../../Dialog/edit-dialog/genin-dialog/genin-dialog.component";
import * as firebase from 'firebase'
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {GeninDeleteDialogComponent} from "../../../Dialog/delete-dialog/genin-delete-dialog/genin-delete-dialog.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";

@Component({
  selector: 'app-list-genin',
  templateUrl: './list-genin.component.html',
  styleUrls: ['./list-genin.component.css']
})
export class ListGeninComponent implements OnInit {
  geninList:any[]=[];
  newgeninList:any[]=[];
  index:number;
  geninData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
  genins: FirebaseListObservable<any[]>;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  OnOff:boolean=false;
  fileList:any[]=[];
  newfileList:any[]=[];
  jyoukyouData;
  InfoData:any[]=[];
  passwordData:any[]=[];
  key:string;
  Data2:any[]=[];
//key:string;
  @ViewChild("editGeninDialog") geninDialogComponent: GeninDialogComponent;
  @ViewChild("deleteGeninDialog") geninDeleteDialogComponent: GeninDeleteDialogComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
  fileData:any[]=[];
  typeData:any;
  onoffData:boolean;




  constructor(private insideMainService:InsideMainService,private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
   // this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.insideService.flagChangeGenin$.subscribe(
      flag => {
        //  console.log('対策');
        this.geninList=[];
        this.newgeninList=[];
        this.geninList=this.insideService.geninList
        for(let key in this.geninList){
          if(this.claimitem.key==this.geninList[key].claimkey){
            this.newgeninList.push(this.geninList[key])
          }
        }

      })

    this.insideService.flagChangeGeninDelete$.subscribe(
      flag => {
        this.key=this.insideMainService.geninkey
        this.Data2=this.insideMainService.geninData;
        //console.log(this.Data2)
        for(let key in this.Data2){

          //  console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
            this.Data2.splice(Number(key),1);
          }
        }
        this.newgeninList=this.Data2;
      })


  }

  ngOnInit() {
    this.geninList=this.insideService.geninList;
    for(let key in this.geninList){
      if(this.claimitem.key==this.geninList[key].claimkey){
         this.newgeninList.push(this.geninList[key])
      }
    }
    this.fileList=this.insideService.fileList;
    for(let key in this.fileList){
       // console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='原因分析'){
       // console.log(this.fileList[key])
        this.newfileList.push(this.fileList[key])
      }
    }


  }


  // View(index){
  //
  //   this.OnOff=!this.OnOff;
  //   this.index=index;
  //   this.geninData=this.newgeninList[index];
  //   this.insideService.shareData=this.geninData;
  //   // console.log(this.taiouData.key)
  //   let jyoukyouData:any[]=[];
  //   let passwordData:any[]=[];
  //   for(let key in this.newfileList){
  //
  //   //  console.log(this.newfileList[key].jyoukyoukey)
  //     if(this.newfileList[key].jyoukyoukey==this.geninData.key){
  //       //  console.log(this.newfileList[key].jyoukyoukey)
  //       jyoukyouData.push(this.newfileList[key]);
  //       passwordData.push(this.geninData.password)
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
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='原因分析'){
        this.newfileList.push(this.fileList[key])
      }
    }
    this.index=index;
    this.geninData=this.newgeninList[index];
    this.insideService.shareData=this.geninData;//shareDataは対応や対策で表示されている一覧が入っている
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.geninData.key){//jyoukyoukeyとはそのファイルがどの対応や対策に紐づいてるかの対応や対策のキー
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
        passwordData.push(this.geninData.password)
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

}else{

  this.insideMainService.onDataUpSuMain(this.uid,count/1024/1024)//画像を取得する際そのMBを合計してその月にどれくらいダウンロードしてるか加算
}

//console.log(this.fileData)
  }

  addImage(index){
    this.insideMainService.setActive(false);
    this.index=index;
    this.geninData=this.newgeninList[index];
    let jyoukyouData:any[]=[];
    let geninData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.geninData.key){
        jyoukyouData.push(this.newfileList[key]);
        geninData.push(this.geninData)
      }
    }
    // console.log(taiouData[0])
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.geninData.key,toukousya:this.geninData.name,
        siten:this.geninData.siten,busyo:this.geninData.busyo,
        claimkey:this.geninData.claimkey,doko:'原因分析',naiyou:this.geninData.naiyou})
      this.insideService.InfoData=this.InfoData
      this.router.navigate(['/main/topclaim/addgenin/addimagegenin']);
    }else {


      this.InfoData.push({
        jyoukyoukey: jyoukyouData[0].jyoukyoukey, toukousya: jyoukyouData[0].toukousya,
        siten: jyoukyouData[0].siten, busyo: jyoukyouData[0].busyo,
        claimkey: jyoukyouData[0].claimkey, doko: '原因分析', naiyou: geninData[0].naiyou
      })
      this.insideService.InfoData = this.InfoData

      this.router.navigate(['/main/topclaim/addgenin/addimagegenin']);
    }
  }

  Close(){
    this.OnOff=false;

  }







  setEdit(index){
    this.index=index
    this.geninData=this.geninList[index];
    this.geninDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.geninData=this.newgeninList[index];
    this.insideMainService.geninData=this.newgeninList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.geninDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
  }



  // Delete(index){
  //   this.index=index
  //   this.geninData=this.geninList[index];
  //   this.deleteGenin(this.geninData.key,this.uid)
  //
  // }
  // deleteGenin(key:string,uid:string){
  //   this.genins=this.af.database.list('GeninData/'+this.uid)
  //   this.genins.remove(key)
  //     .then(data=>{
  //       this.geninList=[];
  //       this.newgeninList=[];
  //       this.geninList=this.insideService.geninList
  //       for(let key in this.geninList){
  //         if(this.claimitem.key==this.geninList[key].claimkey){
  //           this.newgeninList.push(this.geninList[key])
  //         }
  //       }
  //      this.minusGeninSu()
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  // minusGeninSu(){//クレーム情報の対応数をマイナス
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //        let su:number;
  //       su=this.claimList[key].genin-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         genin:su,
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
  //

}
