import {Injectable} from "@angular/core";
import {Jsonp, URLSearchParams, Http} from "@angular/http";
import * as firebase from 'firebase'
import {Department} from "./employee-info/add-department/department.interface";
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {OauthInfoService} from "./oauth-info.service";
import {BranchOffice} from "./employee-info/add-branch-office/BranchOffice.interface";
import {Employee} from "./employee-info/add-employee/Employee.interface";




/**
 * Created by hp on 2017/02/18.
 */
@Injectable()
export class InsideService {
  public file:File;
  busyos: FirebaseListObservable<any[]>;
  sitens: FirebaseListObservable<any[]>;
  busyoList:any[]=[];
  sitenList:any[]=[];
uid:string;
  public busyoAdd: Observable<any>;
  public busyoChanged: Observable<any>;
  public busyoRemoved: Observable<any>;
  public sitenAdd: Observable<any>;
  public sitenChanged: Observable<any>;
  public sitenRemoved: Observable<any>;
  public memberAdd: Observable<any>;
  public memberChanged: Observable<any>;
  public memberRemoved: Observable<any>;
constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,private http:Http,private jsonp:Jsonp){
  this.uid=this.oauthInfoService.uid
  this.busyoAddTrigger(this.uid)
  this.busyoChangeTrigger(this.uid)
  this.busyoRemoveTrigger(this.uid)
  this.sitenAddTrigger(this.uid)
  this.sitenChangeTrigger(this.uid)
  this.sitenRemoveTrigger(this.uid)
  this.memberAddTrigger(this.uid)
  this.memberChangeTrigger(this.uid)
  this.memberRemoveTrigger(this.uid)


}


  //Firebaseのトリガー関連
  busyoAddTrigger(uid){
    this.busyoAdd=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_added', (data)=> {
        observer.next(data)
      });
    })
  }
  busyoChangeTrigger(uid){
    this.busyoChanged=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_changed', (data)=> {
        observer.next(data)
      });
    })
  }
  busyoRemoveTrigger(uid){
    this.busyoRemoved=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_removed', (data)=> {
        observer.next(data)
      });
    })
  }

  sitenAddTrigger(uid){
    this.sitenAdd=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_added', (data) =>{
        observer.next(data)
      });
    })
  }
  sitenChangeTrigger(uid){
    this.sitenChanged=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_changed', (data)=> {
        observer.next(data)
      });
    })
  }
  sitenRemoveTrigger(uid){
    this.sitenRemoved=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_removed', (data)=> {
        observer.next(data)
      });
    })
  }

  memberAddTrigger(uid){
    this.memberAdd=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_added', (data)=> {
        observer.next(data)
      });
    })
  }
  memberChangeTrigger(uid){
    this.memberChanged=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_changed', (data)=> {
        observer.next(data)
      });
    })
  }
  memberRemoveTrigger(uid){
    this.memberRemoved=Observable.create(observer=>{
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_removed', (data)=> {
        observer.next(data)
      });
    })
  }

















addBusyo(data:Department,uid:string){
  const busyo = {
    busyo:data.busyo,
    tourokusya:data.tourokusya,
    startAt: firebase.database.ServerValue.TIMESTAMP
  };
  this.busyos=this.af.database.list('companyData/'+uid+'/BusyoInfo')
 return this.busyos.push(busyo)


}
deleteBusyo(key:string,uid:string){
  this.busyos=this.af.database.list('companyData/'+this.uid+'/BusyoInfo')
  this.busyos.remove(key)
    .then(data=>{

    })
    .catch(error=>{


    });
}

  addSiten(data:BranchOffice,uid:string){
    const siten = {
      siten:data.siten,
      tourokusya:data.tourokusya,
      startAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.busyos=this.af.database.list('companyData/'+uid+'/SitenInfo')
    return this.busyos.push(siten)


  }
  deleteSiten(key:string,uid:string){
    this.sitens=this.af.database.list('companyData/'+this.uid+'/SitenInfo')
    this.sitens.remove(key)
      .then(data=>{

      })
      .catch(error=>{


      });
  }


  addMember(data:Employee,uid:string){
    const member = {
      name:data.name,
      siten:data.siten,
      busyo:data.busyo,
      tourokusya:data.tourokusya,
      startAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.busyos=this.af.database.list('companyData/'+uid+'/MemberInfo')
    return this.busyos.push(member)


  }
  deleteMember(key:string,uid:string){
    this.sitens=this.af.database.list('companyData/'+this.uid+'/MemberInfo')
    this.sitens.remove(key)
      .then(data=>{

      })
      .catch(error=>{


      });
  }































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
   let url = 'http://localhost:8888/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
  // let url = 'http://1-dot-qccloud-asia-northeast1.appspot.com/rest/addFile/url?callback=__ng_jsonp__.__req0.finished';
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
