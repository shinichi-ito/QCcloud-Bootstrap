import {Component, OnInit, Input, Inject, ViewChild} from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import * as firebase from 'firebase'
import {InsideService} from "../../Inside.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../inside-main.service";
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
  @Input() OnOff;
  newLines:any;
  newData:any[]=[];
  newData2:any[]=[];
password:any[]=[];
  password2:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  uid:string;
  jyoukyouData2:any[]=[];
  jyoukyoukey:string;
  fileList:any[]=[];
  taiouData;
  typeData:any;
OnOff2:boolean;
  constructor(private insideMainService:InsideMainService,private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid
    // this.insideMainService.flagChange$.subscribe(
    //   flag => {
    //     this.jyoukyouData2=[];
    //     this.taiouData=this.insideService.shareData;
    //     this.fileList=this.insideService.fileList;
    //     for(let key in this.fileList){
    //       if(this.jyoukyouData[0]){
    //         if(this.fileList[key].claimkey==this.taiouData.claimkey&&this.fileList[key].doko==this.jyoukyouData[0].doko)
    //         this.typeData=this.fileList[key].type;
    //         if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
    //           this.fileList[key]["downloadURL2"] = this.fileList[key].downloadURL;
    //         }else  if (this.typeData.match('application/pdf')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/pdf.png';
    //
    //         }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Oexcel.png';
    //         }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Oword.png';
    //         }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Excel.png';
    //         }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Word.png';
    //         } else {
    //
    //           return
    //         }
    //         this.jyoukyouData2.push(this.fileList[key])
    //         //
    //        }else{
    //         //     console.log('対象のデータがない')
    //       }
    //      }
    // });
    //
    // this.insideMainService.flagChangeDelete$.subscribe(
    //   flag => {
    //     this.jyoukyouData2=[];
    //     this.taiouData=this.insideService.shareData;
    //     this.fileList=this.insideService.fileList;
    //     for(let key in this.fileList){
    //       //  console.log(this.fileList[key].doko)
    //       if(this.jyoukyouData[0]){
    //         //  console.log(this.jyoukyouData[0].doko)
    //         if(this.fileList[key].claimkey==this.taiouData.claimkey&&this.fileList[key].doko==this.jyoukyouData[0].doko)
    //           this.typeData=this.fileList[key].type;
    //         if (this.typeData.match(/^image\/(png|jpeg|gif)$/)){
    //           this.fileList[key]["downloadURL2"] = this.fileList[key].downloadURL;
    //         }else  if (this.typeData.match('application/pdf')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/pdf.png';
    //
    //         }else if (this.typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Oexcel.png';
    //         }else if (this.typeData.match('application/vnd.oasis.opendocument.text')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Oword.png';
    //         }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Excel.png';
    //         }else if (this.typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
    //           this.fileList[key]["downloadURL2"] = 'assets/img/Word.png';
    //         } else {
    //
    //           return
    //         }
    //         this.jyoukyouData2.push(this.fileList[key])
    //         //
    //       }else{
    //         //     console.log('対象のデータがない')
    //       }
    //     }
    //   });
    //


  }

  ngOnInit() {
    if(!this.passwordData){//passwordDataがない時とはつまり　クレーム情報から来た時はパスワードがない
this.OnOff2=false;
      this.fileList=this.jyoukyouData
    //  console.log(this.fileList)
      for(let key in this.fileList){
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
        this.jyoukyouData2.push(this.fileList[key])



      }
    }else{//passwordDataがある時とはつまり　対応やから来た時はパスワードがないある


this.getFilterFile()


      this.OnOff2=true;
      this.jyoukyouData2=[];
      this.taiouData=this.insideService.shareData;
      this.fileList=this.insideService.fileList;
      for(let key in this.fileList){
       // console.log(this.fileList[key].imageAnalysis.length)
      //  console.log(this.fileList[key].imageAnalysis[0])

        if(this.jyoukyouData[0]){
          if(this.fileList[key].claimkey==this.taiouData.claimkey&&this.fileList[key].doko==this.jyoukyouData[0].doko)
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

          this.jyoukyouData2.push(this.fileList[key])
         }else{
          //     console.log('対象のデータがない')
        }
      }



    }


  }


  getFilterFile(){
    let array = ['hair','face', 'hairstyle'];
let newLine:any[]=[];

    for(let key in array){
    //  console.log(array[key])
      newLine= this.insideService.fileList.filter((item)=>{
        if ((item.imageAnalysis).indexOf(array[key]) >= 0) return true;
      });
     // console.log(newLine[0].busyo)
      this.newData.push(newLine[0]);
//console.log(newLine)
    }
// 重複削除

   let b1 = this.newData.filter((x, i, self) => self.indexOf(x) === i);
 for(let key in b1) {
    console.log(b1[key].busyo)

 }
  }



Up(){
  this.jyoukyouData2=[];
  this.taiouData=this.insideService.shareData;
  this.fileList=this.insideService.fileList;
  for(let key in this.fileList){
    //  console.log(this.fileList[key].doko)
    if(this.jyoukyouData[0]){
      //  console.log(this.jyoukyouData[0].doko)
      if(this.fileList[key].claimkey==this.taiouData.claimkey&&this.fileList[key].doko==this.jyoukyouData[0].doko)


      // console.log(this.fileList[key].type)
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
      //     //   //  console.log(this.jyoukyoukey)
      this.jyoukyouData2.push(this.fileList[key])
      //
      //
      //
    }else{
      //     console.log('対象のデータがない')
    }
    //
    //
  }




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
    this.OnOff=false;
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