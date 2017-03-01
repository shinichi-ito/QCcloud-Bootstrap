import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ImageDetail} from "../ImageDetail";
import {Subscription} from "rxjs";
import {FileDetail} from "./FileDetail";
import {ImageService} from "../image.service";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideService} from "../../../Inside.service";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit,OnDestroy {
  @Input() file:ImageDetail;
  @Input() fileId:number;
  comment:string='';
  uid:string;
  flag:boolean=true;
  flagOK:boolean=false;
  flagNG:boolean=false;
  downloadURL:string;
  imageAnalysis:any[]=[]
  key:string;
  private subscription:Subscription;
  private _progress: number = 0;
  claimList:any[]=[];
  claimitem:any;
  Info: FirebaseObjectObservable<any[]>;

  constructor( private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService,private imageService:ImageService,private sanitizer: DomSanitizer) {
    this.uid=this.oauthInfoService.uid
    this.claimitem=this.insideService.claimitem;
  }

  ngOnInit() {
  }
  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.file.imageUrl);
  }

  imageUpload(fileDetail):void{
    // console.log(fileDetail.file.type)
      this.addImage(fileDetail)
  }

  addImage(fileDetail:FileDetail){
    this.imageService.uploadingFile(fileDetail.file,this.uid);//storageに入れている
    this.subscription=this.imageService._progress$.subscribe(
      ( value) =>{
        if (typeof value == "number"){
          this._progress=value;//アップロードの進歩率
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

        this.imageService.imageAnalysis(fileDetail.name).subscribe(data=> {//画像を分析して配列に入れている➀
          for(let key in data.json().responses[0].labelAnnotations){
            this.imageAnalysis.push(data.json().responses[0].labelAnnotations[key].description)
        //  console.log(data.json().responses[0].labelAnnotations[key].description)
           }
       //   console.log(this.insideService.InfoData[0].claimkey)
           this.insideService.addImageInfoDatabase(this.imageAnalysis,this.downloadURL,this.comment).then(data=>{
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
  addImageSu(){//クレーム情報の対応数をプラス
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        //  console.log(this.claimList[key].taiou)

        const claimInfo = {
          file:this.claimList[key].file+1
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
