import {Component, OnInit, Input, Inject, ViewChild} from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import * as firebase from 'firebase'
import {InsideService} from "../../Inside.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {PasswordDialogComponent} from "../../Dialog/password-dialog/password-dialog.component";
import {InsideMainService} from "../../inside-main.service";
import {ImageEditDialogComponent} from "../../Dialog/image-edit-dialog/image-edit-dialog.component";
import {ImageDeleteDialogComponent} from "../../Dialog/delete-dialog/image-delete-dialog/image-delete-dialog.component";
import {ImageDialogComponent} from "../../Dialog/edit-dialog/image-dialog/image-dialog.component";
@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {
  @ViewChild("imageDeleteDialog") imageDeleteDialogComponent: ImageDeleteDialogComponent;
  @ViewChild("imageEditDialog") imageEditDialogComponent: ImageDialogComponent;
@Input() jyoukyouData;
  @Input() passwordData;
password:any[]=[];
  password2:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  uid:string;
  jyoukyouData2:any[]=[];
  jyoukyoukey:string;
  constructor(private insideMainService:InsideMainService,private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid

    this.insideService.flagChangeFileEdit$.subscribe(
      flag => {

        this.jyoukyoukey=this.insideMainService.jyoukyoukey
         this.jyoukyouData2=this.insideMainService.jyoukyouData;
        console.log(this.jyoukyoukey)
        console.log(this.jyoukyouData2)
        for(let key in this.jyoukyouData2) {
           if (this.jyoukyouData2[key].key == this.jyoukyoukey) {
             this.jyoukyouData2[key]={
               claimkey:flag[0].claimkey,key:flag[0].key,imageAnalysis:flag[0].imageAnalysis,downloadURL:flag[0].downloadURL,
              jyoukyoukey:flag[0].jyoukyoukey, type:flag[0].type, comment:flag[0].comment,toukousya:flag[0].toukousya,
              siten:flag[0].siten,busyo:flag[0].busyo,doko:flag[0].doko,filename:flag[0].filename,
               startAt:flag[0].startAt
            }
           }
         }
      this.jyoukyouData=this.jyoukyouData2;
      });




    this.insideService.flagChangeFileDelete$.subscribe(
      flag => {
       this.jyoukyoukey=this.insideMainService.jyoukyoukey
        this.jyoukyouData2=this.insideMainService.jyoukyouData;
      // console.log(this.jyoukyouData2)
     for(let key in this.jyoukyouData2){
        if(this.jyoukyouData2[key].key==this.jyoukyoukey){
          this.jyoukyouData2.splice(Number(key),1);
        }
        }
        this.jyoukyouData=this.jyoukyouData2;
      })





  }

  ngOnInit() {
//console.log(this.jyoukyouData[0].doko)
  //  console.log(this.passwordData[0])
   // console.log(this.jyoukyouData)
  }

  setPassword(idx){
     this.password['filename']=this.jyoukyouData[idx].filename;
    this.password['uid']=this.uid;
    this.password['password']=this.passwordData[0];
    this.password['key']=this.jyoukyouData[idx].key;
    this.imageDeleteDialogComponent.openDialog();
  }
  setEditPassword(idx){
    this.password2['uid']=this.uid;
    this.password2['password']=this.passwordData[0];
    this.password2['key']=this.jyoukyouData[idx].key;
    this.password2['toukousya']=this.jyoukyouData[idx].toukousya;
    this.password2['siten']=this.jyoukyouData[idx].siten;
    this.password2['busyo']=this.jyoukyouData[idx].busyo;
    this.password2['comment']=this.jyoukyouData[idx].comment;
    this.imageEditDialogComponent.openDialog();
  }


delete(){
   let storage = firebase.storage();
  let storageRef = storage.ref();
  let desertRef = storageRef.child('FileData/'+this.uid+'/'+this.jyoukyouData[0].filename);
  desertRef.delete().then(()=> {
    this.minusImageSu()
    // File deleted successfully
  }).catch((error)=> {
    // Uh-oh, an error occurred!
  });

}

  minusImageSu(){//クレーム情報の対応数をマイナス
    this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
      //  console.log(this.claimList[key].file)

        let su:number;
        su=this.claimList[key].file-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          file:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }


}
