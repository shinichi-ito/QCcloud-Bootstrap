import {Injectable} from "@angular/core";
import {Jsonp, URLSearchParams, Http} from "@angular/http";
/**
 * Created by hp on 2017/02/18.
 */
@Injectable()
export class InsideService {
  public file:File;
constructor(private http:Http,private jsonp:Jsonp){}
test(){

  var formData = new FormData();
  formData.append('file',this.file);
  let url:string="http://localhost:8888/rest/addFile/test";
 // let url = 'http://1-dot-qccloud-asia-northeast1.appspot.com/rest/addFile/test?callback=__ng_jsonp__.__req0.finished';

  let xhr:XMLHttpRequest = new XMLHttpRequest();

  xhr.open('POST', url, true);

  xhr.send(formData);
  //通信終了時のイベントハンドラ(成功の可否を問わずに発生)
  xhr.onloadend = (ev)=>{
    console.log("終了");
  };
  xhr.onload=(ev)=>{
    console.log("受信に成功");
  };




}

  getStorageUrl(){
    let params = new URLSearchParams();
    params.set('uid', 'test');
    params.set('syurui', 'test');
    params.set('toukousya', 'test');
    params.set('siten', 'test');
    params.set('busyo', 'test');
    params.set('comment', 'test');
    params.set('mainmail', 'uid');
   //let url = 'http://localhost:8888/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
   let url = 'http://1-dot-qccloud-asia-northeast1.appspot.com/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
    this.jsonp
      .get(url, { search: params })
      .subscribe(
        res  => {
          console.log(res.json().url);
          this.sendFileToDrive(res.json().url,this.file).then(data=>{
            //戻ってくる値
            //"{\"imageInfoDTOList\":[{\"url\":\"https://docs.google.com/spreadsheets/d/1Edz7mYkVVUllcBl4xA6ikeOKOgsGqw8-lGCztgJkkFM/edit\"}]}"
            console.log(JSON.stringify(data).split('\\\"')[5])
          }).catch(error=>{

          })
        },
        error => {
        });


  }
  sendFileToDrive(url:string,file:File):Promise<any>{
    return new Promise((resolve,reject)=>{
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      let formData = new FormData();
      formData.append("file", file, file.name);
      xhr.send(formData);
      //通信終了時のイベントハンドラ(成功の可否を問わずに発生)
      xhr.onloadend = (ev)=>{
        console.log("終了");
      };
      xhr.onload=(ev)=>{
        console.log("受信に成功");
      };
    })
  }

}
