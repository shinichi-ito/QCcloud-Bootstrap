import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {KoukaDialogComponent} from "../../../Dialog/edit-dialog/kouka-dialog/kouka-dialog.component";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
import {Router} from "@angular/router";
import {InsideMainService} from "../../../inside-main.service";
import {KoukaDeleteDialogComponent} from "../../../Dialog/delete-dialog/kouka-delete-dialog/kouka-delete-dialog.component";
import {NoFileListComponent} from "../../../Dialog/no-file-list/no-file-list.component";
import {ViewFileComponent} from "../../../Dialog/view-file/view-file.component";

@Component({
  selector: 'app-list-kouka',
  templateUrl: './list-kouka.component.html',
  styleUrls: ['./list-kouka.component.css']
})
export class ListKoukaComponent implements OnInit {
  koukaList:any[]=[];
  index:number;
  koukaData;
  uid:string;
  syubetu:string;
  name:string;
  siten:string;
  busyo:string;
  naiyou:string;
  value: FirebaseObjectObservable<any>;
//key:string;
  newkoukaList:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  koukas: FirebaseListObservable<any[]>;
  jyoukyouData;
  InfoData:any[]=[];
  OnOff:boolean=false;
  fileList:any[]=[];
  newfileList:any[]=[];
  passwordData:any[]=[];
  key:string;
  Data2:any[]=[];
  @ViewChild("editKoukaDialog") koukaDialogComponent: KoukaDialogComponent;
  @ViewChild("deleteKoukaDialog") koukaDeleteDialogComponent: KoukaDeleteDialogComponent;

  @ViewChild("noFileListDialog") noFileListComponent: NoFileListComponent;
  @ViewChild("fileDialog") viewFileComponent: ViewFileComponent;
  fileData:any[]=[];
  typeData:any;
  onoffData:boolean;



  constructor(private insideMainService:InsideMainService,private router: Router,private af : AngularFire,private oauthInfoService:OauthInfoService,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    //this.key=this.insideService.claimitem.key;
    this.claimitem=this.insideService.claimitem;
    this.insideService.flagChangeKouka$.subscribe(
      flag => {
        //  console.log('対策');
        this.koukaList=[];
        this.newkoukaList=[];
        this.koukaList=this.insideService.koukaList
        for(let key in this.koukaList){
          if(this.claimitem.key==this.koukaList[key].claimkey){
            this.newkoukaList.push(this.koukaList[key])
          }
        }

      })
    this.insideService.flagChangeKoukaDelete$.subscribe(
      flag => {
        this.key=this.insideMainService.koukakey
        this.Data2=this.insideMainService.koukaData;
        //console.log(this.Data2)
        for(let key in this.Data2){

          //  console.log(this.Data2[key])
          if(this.Data2[key].key==this.key){
            this.Data2.splice(Number(key),1);
          }
        }
        this.newkoukaList=this.Data2;
      })

  }


  ngOnInit() {
    this.koukaList=this.insideService.koukaList;

    for(let key in this.koukaList){
      if(this.claimitem.key==this.koukaList[key].claimkey&&this.insideMainService.koukaFromTaisakudata.key==this.koukaList[key].taisakukey){
          this.newkoukaList.push(this.koukaList[key])
      }
    }
    this.fileList=this.insideService.fileList;
    for(let key in this.fileList){
      //  console.log(this.fileList[key].doko)
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='効果確認'){
        this.newfileList.push(this.fileList[key])
      }
    }
  }


  // View(index){
  //   this.OnOff=!this.OnOff;
  //   this.index=index;
  //   this.koukaData=this.newkoukaList[index];
  //   this.insideService.shareData=this.koukaData;
  //   // console.log(this.taiouData.key)
  //   let jyoukyouData:any[]=[];
  //   let passwordData:any[]=[];
  //   for(let key in this.newfileList){
  //
  //     // console.log(this.newfileList[key].jyoukyoukey)
  //     if(this.newfileList[key].jyoukyoukey==this.koukaData.key){
  //       //  console.log(this.newfileList[key].jyoukyoukey)
  //       jyoukyouData.push(this.newfileList[key]);
  //       passwordData.push(this.koukaData.password)
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
      if(this.claimitem.key==this.fileList[key].claimkey&&this.fileList[key].doko=='効果確認'){
        this.newfileList.push(this.fileList[key])
      }
    }
    this.index=index;
    this.koukaData=this.newkoukaList[index];
    this.insideService.shareData=this.koukaData;//shareDataは対応や対策で表示されている一覧が入っている
    let jyoukyouData:any[]=[];
    let passwordData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.koukaData.key){//jyoukyoukeyとはそのファイルがどの対応や対策に紐づいてるかの対応や対策のキー
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
        passwordData.push(this.koukaData.password)
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
    this.koukaData=this.newkoukaList[index];
    let jyoukyouData:any[]=[];
    let koukaData:any[]=[];
    for(let key in this.newfileList){
      if(this.newfileList[key].jyoukyoukey==this.koukaData.key){
        jyoukyouData.push(this.newfileList[key]);
        koukaData.push(this.koukaData)
      }
    }
    // console.log(taiouData[0])
    if(!jyoukyouData[0]){
      this.InfoData.push({jyoukyoukey:this.koukaData.key,toukousya:this.koukaData.name,
        siten:this.koukaData.siten,busyo:this.koukaData.busyo,
        claimkey:this.koukaData.claimkey,doko:'効果確認',naiyou:this.koukaData.naiyou})
      this.insideService.InfoData=this.InfoData
      this.router.navigate(['/main/topclaim/addkouka/addimagekouka']);
    }else {


      this.InfoData.push({
        jyoukyoukey: jyoukyouData[0].jyoukyoukey, toukousya: jyoukyouData[0].toukousya,
        siten: jyoukyouData[0].siten, busyo: jyoukyouData[0].busyo,
        claimkey: jyoukyouData[0].claimkey, doko: '効果確認', naiyou: koukaData[0].naiyou
      })
      this.insideService.InfoData = this.InfoData

      this.router.navigate(['/main/topclaim/addkouka/addimagekouka']);
    }
  }

  Close(){
    this.OnOff=false;

  }


ReturnTaisaku(){
  this.router.navigate(['/main/topclaim/addtaisaku/listtaisaku'])
}











  setEdit(index){
    this.index=index
    this.koukaData=this.koukaList[index];
    this.koukaDialogComponent.openDialog();
  }

  Delete(index){
    this.index=index;
    this.koukaData=this.newkoukaList[index];
    this.insideMainService.koukaData=this.newkoukaList;//jyoukyoData内にはFileDataの更に対応や対策等に絞り込んだデータが入っている　それを一旦別に保管
    this.koukaDeleteDialogComponent.openDialog();
    //  this.deleteTaiou(this.taiouData.key,this.uid)
  }




  // Delete(index){
  //   this.index=index
  //   this.koukaData=this.koukaList[index];
  //   this.deleteKouka(this.koukaData.key,this.uid)
  //  }
  //
  //
  //
  // deleteKouka(key:string,uid:string){
  //   this.koukas=this.af.database.list('KoukaData/'+this.uid)
  //   this.koukas.remove(key)
  //     .then(data=>{
  //       this.koukaList=[];
  //       this.newkoukaList=[];
  //       this.koukaList=this.insideService.koukaList
  //       for(let key in this.koukaList){
  //         if(this.claimitem.key==this.koukaList[key].claimkey){
  //           this.newkoukaList.push(this.koukaList[key])
  //         }
  //       }
  //       this.minusKoukaSu()
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  //
  // minusKoukaSu(){//クレーム情報の対応数をマイナス
  //
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //       let su:number;
  //       su=this.claimList[key].kouka-1
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         kouka:su,
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
