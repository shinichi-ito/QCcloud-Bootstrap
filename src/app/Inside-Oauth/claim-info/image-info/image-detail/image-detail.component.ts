import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageDetail} from "../ImageDetail";
import {Subscription} from "rxjs";
import {FileDetail} from "./FileDetail";
import {ImageService} from "../image.service";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {AngularFire,  FirebaseObjectObservable} from "angularfire2";
import * as firebase from 'firebase'
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnDestroy{
  @Input() file:ImageDetail;
  @Input() fileId:number;
  comment:string='';
  uid:string;
  flag:boolean=true;
  flagOK:boolean=false;
  flagNG:boolean=false;
  noSupport:boolean=false;
  downloadURL:string;
  imageAnalysis:any[]=[]
  key:string;
  private subscription:Subscription;
  private _progress: number = 0;
  claimList:any[]=[];
  claimitem:any;
  Info: FirebaseObjectObservable<any[]>;

fileUrl:string;
  constructor( private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService,private imageService:ImageService,private sanitizer: DomSanitizer) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
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
    this.noSupport=true;
    return
    }

  }

  addImage(fileDetail:FileDetail){
    this.imageService.uploadingFile(fileDetail.file,this.uid);//storageに入れている
    this.subscription=this.imageService._progress$.subscribe(
      ( value) =>{
        if (typeof value == "number"){
          this._progress=value;//アップロードの進歩率
         console.log(this._progress)
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

        this.imageService.imageAnalysis(fileDetail.name).subscribe(data=> {//画像を分析して配列に入れている➀
          for(let key in data.json().responses[0].labelAnnotations){
            this.imageAnalysis.push(data.json().responses[0].labelAnnotations[key].description)
        //  console.log(data.json().responses[0].labelAnnotations[key].description)
           }
       //   console.log(this.insideService.InfoData[0].claimkey)
           this.insideService.addImageInfoDatabase(this.imageAnalysis,this.downloadURL,this.comment,fileDetail.type,fileDetail.name).then(data=>{
           this.addImageSu()
            this.flag=false;
            this.flagOK=true;
             this.flagNG=false;
             }).catch(error=>{
            }
            )
         },(error)=>{
        }
        )
      }
    )
  }

  addFile(fileDetail:FileDetail){
    this.imageService.uploadingFile2(fileDetail.file,this.uid);//storageに入れている
    this.subscription=this.imageService._progress$.subscribe(
      ( value) =>{
        if (typeof value == "number"){
          this._progress=value;//アップロードの進歩率
          console.log(this._progress)
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
            this.insideService.addFileInfoDatabase(this.downloadURL,this.comment,fileDetail.type,fileDetail.name).then(data=>{
              this.addImageSu()
              this.flag=false;
              this.flagOK=true;
              this.flagNG=false;
            }).catch(error=>{
              }
            )

      }
    )
  }




  addImageSu(){//クレーム情報の対応数をプラス
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        //  console.log(this.claimList[key].taiou)

        const claimInfo = {
          file:this.claimList[key].file+1,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.Info=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.Info.update(claimInfo).then(data=>{

        }).catch(error=>{

        })


      }
    }




  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
}

}
