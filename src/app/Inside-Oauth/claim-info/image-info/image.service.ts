import {Injectable, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {ImageDetail} from "./ImageDetail";
import {FirebaseApp} from "angularfire2";

@Injectable()
export class ImageService {
  flagChange$: Observable<any>;
  private _observer;
  private percentage:number;
  private _firebase:any;
  private image:string;
  public _progress$: Observable<number>;
  public _loadBase64$: Observable<number>;
  public imagedetail:ImageDetail[]=[];
  public base64:any[]=[];

  constructor(@Inject(FirebaseApp) firebaseApp: any) {
    this._firebase = firebaseApp;
    this.percentage = 0;
    this.flagChange$ = new Observable(observer =>
      this._observer = observer).share();
  }
  addFile(file:File):void {//<input type=file  でファイルを選択するとfile-upload.direcitiveを通じてここに入る
    //console.log(file.name)
    this.imagedetail.push(new ImageDetail(file.name,file.size,file.type,window.URL.createObjectURL(file),file))
     this._observer.next(this.imagedetail);
     this.loadImage(file)//base64:any[]=[];に名前付きの連想配列でbase64を入れる


  }
  loadImage(file:File){
    let base64:string;
    let filename:string;
    if (!file.type.match(/^image\/(png|jpeg|gif)$/))
      return; // 画像ファイル以外は処理中止

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    var img = new Image();
    filename=file.name
    let blobUrl = window.URL.createObjectURL(file);
    img.src = blobUrl;

    img.onload = ()=>{
      ctx.drawImage(img, 0, 0);
      let base64FileData = canvas.toDataURL('image/webp');
      base64=base64FileData.split("base64,")[1];
      this.base64[filename]=base64
      // console.log(base64)
    }


  }



}
