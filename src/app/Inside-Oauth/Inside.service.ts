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
  memberList:any[]=[];
  syubetuList:any[]=[];
  taiouList:any[]=[];
  taisakuList:any[]=[];
  claimList:any[]=[];
uid:string;
key:string;
public claimitem:any;
constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,private http:Http,private jsonp:Jsonp){
  this.uid=this.oauthInfoService.uid;
  this.busyoAddTrigger(this.uid);
  this.busyoChangeTrigger(this.uid);
  this.busyoRemoveTrigger(this.uid);
  this.sitenAddTrigger(this.uid);
  this.sitenChangeTrigger(this.uid);
  this.sitenRemoveTrigger(this.uid);
  this.memberAddTrigger(this.uid);
  this.memberChangeTrigger(this.uid);
  this.memberRemoveTrigger(this.uid);
  this.syubetuAdd(this.uid);
  this.taiouJyoukyouAdd(this.uid);
  this.taisakuJyoukyouAdd(this.uid);
  this.claimAddTrigger(this.uid);
  this.claimChangeTrigger(this.uid);
  this.claimRemoveTrigger(this.uid);
}


  //Firebaseのトリガー関連
  busyoAddTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_added', (value)=> {
        this.busyoList.push({key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    })
  }
  busyoChangeTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_changed', (value)=> {
        for(let index in this.busyoList){
          if(this.busyoList[index].key==value.key){
            this.busyoList[index]={key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt}
          }
        }
    })
  }
  busyoRemoveTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/BusyoInfo');
      commentsRef.on('child_removed', (value)=> {
        for(let key in this.busyoList){
          if(this.busyoList[key].key==value.key){
           this.busyoList.splice(Number(key),1);
          }
        }
   })
  }

  sitenAddTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_added', (value) =>{
        this.sitenList.push({key:value.key,siten:value.val().siten,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    })
  }
  sitenChangeTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_changed', (value)=> {
        for(let index in this.sitenList){
          if(this.sitenList[index].key==value.key){
            this.sitenList[index]={key:value.key,siten:value.val().siten,tourokusya:value.val().tourokusya,startAt:value.val().startAt}
          }
        }
    })
  }
  sitenRemoveTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/SitenInfo');
      commentsRef.on('child_removed', (value)=> {
        for(let key in this.sitenList){
          if(this.sitenList[key].key==value.key){
            this.sitenList.splice(Number(key),1);
          }
        }
    })
  }

  memberAddTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_added', (value)=> {
        console.log()
        this.memberList.push({key:value.key,name:value.val().name,siten:value.val().siten,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    })
  }
  memberChangeTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_changed', (value)=> {
        for(let index in this.memberList){
          if(this.memberList[index].key==value.key){
            this.memberList[index]={key:value.key,name:value.val().name,siten:value.val().siten,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt}
          }
        }
    })
  }
  memberRemoveTrigger(uid){
      let commentsRef = firebase.database().ref('companyData/'+uid+'/MemberInfo');
      commentsRef.on('child_removed', (value)=> {
        for(let key in this.memberList){
          if(this.memberList[key].key==value.key){
            this.memberList.splice(Number(key),1);
          }
        }
    })
  }

  claimAddTrigger(uid){
    let commentsRef = firebase.database().ref('ClaimData/'+uid);
    commentsRef.on('child_added', (value)=> {
    //  console.log("claim追加"+value.val().siten)
     this.claimList.push({key:value.key,syubetu:value.val().syubetu,siten:value.val().siten
        ,busyo:value.val().busyo, gaiyou:value.val().gaiyou,seihin:value.val().seihin,
       name:value.val().name,basyo:value.val().basyo,moto:value.val().moto, seihininfo:value.val().seihininfo,
       syousai:value.val().syousai, yosoukoutei:value.val().yosoukoutei,
       password: value.val().password,koukai:value.val().koukai,startAt:value.val().startAt, updateAt: value.val().updateAt,
       hasseibi:value.val().hasseibi, hasseiji:value.val().hasseiji})
    })
  }
  claimChangeTrigger(uid){
    let commentsRef = firebase.database().ref('ClaimData/'+uid);
    commentsRef.on('child_changed', (value)=> {
     // console.log("claim変更"+value.val().busyo)
      // for(let index in this.claimList){
      //   if(this.claimList[index].key==value.key){
      //     this.claimList[index]={key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt}
      //   }
      // }
    })
  }
  claimRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('ClaimData/'+uid);
    commentsRef.on('child_removed', (value)=> {
    //  console.log("claim削除"+value)
      // for(let key in this.claimList){
      //   if(this.claimList[key].key==value.key){
      //     this.claimList.splice(Number(key),1);
      //   }
      // }
    })
  }


  taiouAddTrigger(uid){
    let commentsRef = firebase.database().ref('TaiouData/'+uid);
    commentsRef.on('child_added', (value)=> {
     // console.log("taiou追加"+value.val().siten)
      //  this.claimList.push({key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
    })
  }















  syubetuAdd(uid){
  let commentsRef = firebase.database().ref('selectData/'+uid+'/syubetuInfo');
  commentsRef.on('child_added', (value)=> {
   //console.log(value.key)
    //console.log(value.val().syubetuInfo)
  this.syubetuList.push({key:value.key,syubetu:value.val().syubetuInfo})
    //  this.claimList.push({key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
  })
}

  taiouJyoukyouAdd(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taiouInfo');
    commentsRef.on('child_added', (value)=> {
      // console.log(value.key)
     // console.log(value.val())
      this.taiouList.push({key:value.key,taiou:value.val().taiouInfo})
    })
  }

  taisakuJyoukyouAdd(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taisakuInfo');
    commentsRef.on('child_added', (value)=> {
      // console.log(value.key)
     //  console.log(value.val())
      this.taisakuList.push({key:value.key,taisaku:value.val().taisakuInfo})
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
