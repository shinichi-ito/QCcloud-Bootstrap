import {Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageDetail} from "../ImageDetail";
import {Subscription} from "rxjs";
import {FileDetail} from "./FileDetail";
import {ImageService} from "../image.service";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {AngularFire,  FirebaseObjectObservable} from "angularfire2";
import * as firebase from 'firebase'
import {InsideMainService} from "../../../inside-main.service";
import {ErrorDialogComponent} from "../../../Dialog/error-dialog/error-dialog.component";
import {ProgressDialogComponent} from "../../../Dialog/progress-dialog/progress-dialog.component";
import {ProgressImageDialogComponent} from "../../../Dialog/progress-image-dialog/progress-image-dialog.component";
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnDestroy{
  @Input() file:ImageDetail;
  @Input() fileId:number;
  @ViewChild("errorDialog") errorDialogComponent: ErrorDialogComponent;
  errorData:any;
  @ViewChild("progrssImageDialog") progressImageDialogComponent: ProgressImageDialogComponent;
  Data:any;


  comment:string='';
  uid:string;
  flag:boolean=true;
  flagOK:boolean=false;
  flagNG:boolean=false;
 // noSupport:boolean=false;
  downloadURL:string;
  imageAnalysis:any[]=[]
  key:string;
  private subscription:Subscription;
  private _progress: number = 0;
  claimList:any[]=[];
  claimitem:any;
  Info: FirebaseObjectObservable<any[]>;

fileUrl:string;
  constructor( private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService,
               private imageService:ImageService,private sanitizer: DomSanitizer,private insideMainService:InsideMainService) {

    this.insideMainService.flagChangeError$.subscribe((error)=>{
      this.errorData=error;
      this.errorDialogComponent.openDialog();
    });

    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.InfoData;
   // console.log('kkk')
   // console.log(this.claimitem[0].claimkey)
  }


   photoURL() {
     let typeData=this.file.type;
   //  console.log(typeData)
     let blobUrl;



     if (this.file.type.match(/^image\/(png|jpeg|gif)$/)){
     //  console.log(this.sanitizer.bypassSecurityTrustUrl(this.file.imageUrl))
         return this.sanitizer.bypassSecurityTrustUrl(this.file.imageUrl);
     }else  if (typeData.match('application/pdf')) {

       blobUrl="assets/img/pdf.png";
       this.fileUrl=blobUrl
     }else if (typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
        blobUrl="assets/img/Oexcel.png";
       this.fileUrl=blobUrl
     }else if (typeData.match('application/vnd.oasis.opendocument.text')) {
       // typeError = false;
       blobUrl="assets/img/Oword.png";
       this.fileUrl=blobUrl
     }else if (typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        blobUrl="assets/img/Excel.png";
       this.fileUrl=blobUrl
     }else if (typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
       blobUrl="assets/img/Word.png";
       this.fileUrl=blobUrl
     } else {
        blobUrl="assets/img/NoSupport.png";
       this.fileUrl=blobUrl
     }
 }




  imageUpload(fileDetail):void{

    let typeData=fileDetail.file.type;
    if (typeData.match(/^image\/(png|jpeg|gif)$/)){
      this.addImage(fileDetail)
    }else  if (typeData.match('application/pdf')) {
      this.addFile(fileDetail)

    }else if (typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
      this.addFile(fileDetail)
    }else if (typeData.match('application/vnd.oasis.opendocument.text')) {
      this.addFile(fileDetail)
    }else if (typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      this.addFile(fileDetail)
    }else if (typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      this.addFile(fileDetail)
    } else {
this.flag=false;
   // this.noSupport=true;
    return
    }

  }

  addImage(fileDetail:FileDetail){
    this.progressImageDialogComponent.openDialog();
    this.imageService.uploadingFile(fileDetail.file,this.uid);//storageに入れている
    this.subscription=this.imageService._progress$.subscribe(
      ( value) =>{
        if (typeof value == "number"){
          this.Data= Math.floor(value);
        //  this._progress=value;//アップロードの進歩率
        // console.log(this._progress)
        }else{


          this.downloadURL=value

         // console.log(this.downloadURL)
        }
      },
      error => {
        this.flag=false;
        this.flagOK=false;
        this.flagNG=true;
      },
      ()=>{

        this.imageService.imageAnalysis(fileDetail.name).subscribe(data=> {//画像を分析して配列に入れている➀
          for(let key in data.json().responses[0].labelAnnotations){
            this.imageAnalysis.push(data.json().responses[0].labelAnnotations[key].description)
        //  console.log(data.json().responses[0].labelAnnotations[key].description)
           }
       //   console.log(this.insideService.InfoData[0].claimkey)
           this.insideService.addImageInfoDatabase(this.imageAnalysis,this.downloadURL,this.comment,fileDetail.type,fileDetail.size).then(data=>{
           this.addImageSu(fileDetail)
            // console.log('ここ')
            this.flag=false;
            this.flagOK=true;
             this.flagNG=false;
             }).catch(error=>{
               this.progressImageDialogComponent.closeDialog();
               this.errorData=error.message;
               this.errorDialogComponent.openDialog()


            }
            )
         },(error)=>{
            this.progressImageDialogComponent.closeDialog();
            this.errorData=error.message;
            this.errorDialogComponent.openDialog()
        }
        )
      }
    )
  }

  addFile(fileDetail:FileDetail){
    this.progressImageDialogComponent.openDialog();
    this.imageService.uploadingFile2(fileDetail.file,this.uid);//storageに入れている
    this.subscription=this.imageService._progress$.subscribe(
      ( value) =>{
        if (typeof value == "number"){
          this.Data= Math.floor(value);
        //  this._progress=value;//アップロードの進歩率
        //  console.log(this._progress)
        }else{
          this.downloadURL=value
        }
      },
      error => {
        this.flag=false;
        this.flagOK=false;
        this.flagNG=true;
      },
      ()=>{
        //   console.log(this.insideService.InfoData[0].claimkey)
            this.insideService.addFileInfoDatabase(this.downloadURL,this.comment,fileDetail.type,fileDetail.size).then(data=>{
              this.addImageSu(fileDetail);
              this.flag=false;
              this.flagOK=true;
              this.flagNG=false;
            }).catch(error=>{
              this.progressImageDialogComponent.closeDialog();
              this.errorData=error.message;
              this.errorDialogComponent.openDialog()

              }
            )

      }
    )
  }




  addImageSu(fileDetail:FileDetail){//クレーム情報のファイル数をプラス
    this.claimList=this.insideService.claimList;
    for(let key in this.claimList) {
     // console.log(this.claimList[key].key)
     // console.log(this.claimitem.claimkey)
      if (this.claimList[key].key == this.claimitem[0].claimkey) {
        //

        const claimInfo = {
           file:this.claimList[key].file+1,
           fileUp: firebase.database.ServerValue.TIMESTAMP
         };
         this.Info=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
         this.Info.update(claimInfo).then(data=>{

 this.progressImageDialogComponent.closeDialog();
 this.insideMainService.onDataUpSuMain(this.uid,fileDetail.size)
         }).catch(error=>{
           this.progressImageDialogComponent.closeDialog();
           this.errorData=error.message;
           this.errorDialogComponent.openDialog()
         })


      }
    }




  }


  ngOnDestroy(){
   // this.subscription.unsubscribe();
}

}
