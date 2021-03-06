import {Injectable, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {ImageDetail} from "./ImageDetail";
import {FirebaseApp} from "angularfire2";
import {Http} from "@angular/http";
import * as firebase from 'firebase';
import {InsideService} from "../../Inside.service";
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

  constructor(private insideService:InsideService,private http:Http,@Inject(FirebaseApp) firebaseApp: any) {
    this._firebase = firebaseApp;
    this.percentage = 0;
    this.flagChange$ = new Observable(observer =>
      this._observer = observer).share();
  }
  addFile(file:File):void {//<input type=file  でファイルを選択するとfile-upload.direcitiveを通じてここに入る
    //console.log(file.name)
    let sizecheck:boolean;
    let typecheck:boolean;
    if(file.size<10 * 1024 * 1024){
      sizecheck=false;
    }else{
      sizecheck=true;
    }
    let typeData=file.type;
    if (file.type.match(/^image\/(png|jpeg|gif)$/)){
      typecheck=false;

    }else  if (typeData.match('application/pdf')) {
       typecheck=false;

    }else if (typeData.match('application/vnd.oasis.opendocument.spreadsheet')) {
       typecheck=false;

    }else if (typeData.match('application/vnd.oasis.opendocument.text')) {
       typecheck=false;

    }else if (typeData.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
       typecheck=false;

    }else if (typeData.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
       typecheck=false;

    } else {
       typecheck=true;

    }






    this.imagedetail.push(new ImageDetail(file.name,file.size,file.type,window.URL.createObjectURL(file),file,sizecheck,typecheck));
     this._observer.next(this.imagedetail);
     this.loadImage(file)//base64:any[]=[];に名前付きの連想配列でbase64を入れる


  }

  setFile():void {

    this.imagedetail=[];


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
test(){




}
  uploadingFile(file:File,uid:string) {
    let storage = firebase.storage();
    let Ref = storage.ref();
    let filename= new Date().getTime()+'<>'+file.name;
    this.insideService.filename=filename;
    let fileUploading = Ref.child('FileData/'+uid+'/' + filename).put(file);
    this._progress$=Observable.create(observer=>{
      fileUploading.on('state_changed',
        (snapshot)=> {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         // console.log(percentage)
          observer.next(percentage)
        },
        (error)=> {
          switch (error.message) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          observer.error(error.message)
        },
        ()=> {
          let downloadURL = fileUploading.snapshot.downloadURL;
         // console.log(downloadURL)
          observer.next(downloadURL);

          observer.complete()
        }

      );

    });


  }

  uploadingFile2(file:File,uid:string) {
    let storage = firebase.storage();
    let Ref = storage.ref();
    let filename= new Date().getTime()+'<>'+file.name;
    this.insideService.filename=filename;
    let fileUploading = Ref.child('FileData/'+uid+'/' + filename).put(file);
    // let storageRef = this._firebase.storage().ref('FileData/'+uid+'/'+file.name)
    // let fileUploading =  storageRef.put(file);
    this._progress$=Observable.create(observer=>{
      fileUploading.on('state_changed',
        (snapshot)=> {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(percentage)
          observer.next(percentage)
        },
        (error)=> {
          switch (error.message) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          observer.error(error.message)
        },
        ()=> {
          let downloadURL = fileUploading.snapshot.downloadURL;
          console.log(downloadURL)
          observer.next(downloadURL);

          observer.complete()
        }

      );

    });


  }




  imageAnalysis(filename:string){
    let base64:string;
    var VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate?key=";//画像解析
    var apiKey = "AIzaSyDCIMKBP2jorKKBJaCXtm3024C1IHD-UCA";
    base64=this.base64[filename]
    if (!base64) {
// 画像データが無ければアラートを表示して終了します。
      alert("キャプチャデータがありません。");
      return;
    }
// Vision APIへのリクエストデータを作成。
    // imageのcontextにBase64エンコードした画像データを設定します。
    // featuresのtypeに顔検知機能の値である'FACE_DETECTION'を設定します。
    // typeを変えることによって、ロゴやOCRなどの他の機能を使うことができます。
    // featuresのmaxResultsには1以上の数値を設定しましょう。
    var data = {
      "requests":[
        {
          "image":{
            "content": base64
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":3
            },
            {
              "type":"IMAGE_PROPERTIES",
              "maxResults":3

            }
          ]
        }
      ],
    }

// Vision APIのエンドポイントにPOSTします。
    return this.http.post(VISION_API_URL + apiKey, data)


    // this.imageAnalysis().subscribe(data=>{//画像関連
    //     for(let key in data.json().responses){
    //       for(let keys in data.json().responses[key].labelAnnotations){
    //         console.log(data.json().responses[key].labelAnnotations[keys].description)
    //       }
    //     }
    //   }
    // )
    //



  }
  textAnalysis(inputData:string){
    var VISION_API_URL = "https://language.googleapis.com/v1beta1/documents:analyzeEntities?key=";//固有名詞抽出
    var apiKey = "AIzaSyDCIMKBP2jorKKBJaCXtm3024C1IHD-UCA";
    var data = {
      "document":{
        "type":"PLAIN_TEXT",
        "content":inputData//この文字内の固有名詞を抽出
      },
      "encodingType":"UTF8"
    };
    this.http.post(VISION_API_URL + apiKey, data).subscribe((value:any)=>{
      for(let key in value.json().entities){
        console.log( value.json().entities[key].name)
      }

    })

  }


}
