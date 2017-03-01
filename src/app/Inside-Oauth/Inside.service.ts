import {Injectable} from "@angular/core";
import {Jsonp, URLSearchParams, Http} from "@angular/http";
import * as firebase from 'firebase'
import {Department} from "./employee-info/add-department/department.interface";
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "./oauth-info.service";
import {BranchOffice} from "./employee-info/add-branch-office/BranchOffice.interface";
import {Employee} from "./employee-info/add-employee/Employee.interface";
import {Observable} from "rxjs";




/**
 * Created by hp on 2017/02/18.
 */
@Injectable()
export class InsideService {
  public file:File;
  busyos: FirebaseListObservable<any[]>;
  sitens: FirebaseListObservable<any[]>;
  members: FirebaseListObservable<any[]>;
  // taious: FirebaseListObservable<any[]>;
  //taisakus: FirebaseListObservable<any[]>;
 // genins: FirebaseListObservable<any[]>;
 // koukas: FirebaseListObservable<any[]>;
 //  comments: FirebaseListObservable<any[]>;
  busyoList:any[]=[];
  sitenList:any[]=[];
  memberList:any[]=[];
  syubetuList:any[]=[];
  taiouSyubetuList:any[]=[];
  taisakuSyubetuList:any[]=[];
  claimList:any[]=[];
  fileList:any[]=[];
  taiouList:any[]=[];
  taisakuList:any[]=[];
  newtaisakuList:any[]=[];
  geninList:any[]=[];
  koukaList:any[]=[];
  commentList:any[]=[];
uid:string;//会社を振り分けるログイン時に受け取るユニークの値
key:string;//各登録情報のユニークなキー
  InfoData:any;//対策や対応情報を選択した際そのデータを入れておく key name siten busyo
  flagChangeTaisaku$: Observable<number>;
  private _observerTaisaku;
  flagChangeTaiou$: Observable<number>;
  private _observerTaiou;

  flagChangeComment$: Observable<number>;
  private _observerComment;

  flagChangeGenin$: Observable<number>;
  private _observerGenin;

  flagChangeKouka$: Observable<number>;
  private _observerKouka;



 // syubetukey:string;//対応情報や対策情報などの各ユニークなキー
  imageInfo: FirebaseListObservable<any[]>;
public claimitem:any;

constructor(private oauthInfoService:OauthInfoService,private af : AngularFire,private http:Http,private jsonp:Jsonp){
  this.flagChangeTaisaku$ = new Observable(observer =>
    this._observerTaisaku = observer).share();
  this.flagChangeTaiou$ = new Observable(observer =>
    this._observerTaiou = observer).share();

  this.flagChangeComment$ = new Observable(observer =>
    this._observerComment = observer).share();

  this.flagChangeGenin$ = new Observable(observer =>
    this._observerGenin = observer).share();

  this.flagChangeKouka$ = new Observable(observer =>
    this._observerKouka = observer).share();






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
  this.syubetuChange(this.uid);
  this.syubetuRemove(this.uid);
  this.taiouJyoukyouAdd(this.uid);
  this. taiouJyoukyouChange(this.uid);
  this.taiouJyoukyouRemove(this.uid);
  this.taisakuJyoukyouAdd(this.uid);
  this.taisakuJyoukyouChange(this.uid);
  this.taisakuJyoukyouRemove(this.uid);
  this.claimAddTrigger(this.uid);
  this.claimChangeTrigger(this.uid);
  this.claimRemoveTrigger(this.uid);
  this.taiouAddTrigger(this.uid);
  this.taiouChangeTrigger(this.uid);
  this.taiouRemoveTrigger(this.uid);
  this.taisakuAddTrigger(this.uid);
  this.taisakuChangeTrigger(this.uid);
  this.taisakuRemoveTrigger(this.uid);
  this.geninAddTrigger(this.uid);
  this.geninChangeTrigger(this.uid);
  this.geninRemoveTrigger(this.uid);
  this.koukaAddTrigger(this.uid);
  this.koukaChangeTrigger(this.uid);
  this.koukaRemoveTrigger(this.uid);
  this.commentAddTrigger(this.uid);
  this.commentChangeTrigger(this.uid);
  this.commentRemoveTrigger(this.uid);
  this.fileAddTrigger(this.uid);
  this.fileChangeTrigger(this.uid);
  this.fileRemoveTrigger(this.uid);


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
       hasseibi:value.val().hasseibi, hasseiji:value.val().hasseiji,taiou:value.val().taiou,
     taisaku:value.val().taisaku,genin:value.val().genin,
     kouka:value.val().kouka,comment:value.val().comment,file:value.val().file})
    })
  }
  claimChangeTrigger(uid){
    let commentsRef = firebase.database().ref('ClaimData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      console.log("claim変更"+value.val().taiou)
       for(let index in this.claimList){
         if(this.claimList[index].key==value.key){
           this.claimList[index]={key:value.key,syubetu:value.val().syubetu,siten:value.val().siten
             ,busyo:value.val().busyo, gaiyou:value.val().gaiyou,seihin:value.val().seihin,
             name:value.val().name,basyo:value.val().basyo,moto:value.val().moto, seihininfo:value.val().seihininfo,
             syousai:value.val().syousai, yosoukoutei:value.val().yosoukoutei,
             password: value.val().password,koukai:value.val().koukai,startAt:value.val().startAt, updateAt: value.val().updateAt,
             hasseibi:value.val().hasseibi, hasseiji:value.val().hasseiji,taiou:value.val().taiou,
             taisaku:value.val().taisaku,genin:value.val().genin,
             kouka:value.val().kouka,comment:value.val().comment,file:value.val().file}
         }
       }


    })
  }
  claimRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('ClaimData/'+uid);
    commentsRef.on('child_removed', (value)=> {
    //  console.log("claim削除"+value)
       for(let key in this.claimList){
        if(this.claimList[key].key==value.key){
           this.claimList.splice(Number(key),1);
         }
       }
    })
  }


  addImageInfoDatabase(jsonData:any,downloadURL:string,comment:string){
    const imageInfo = {
      doko:this.InfoData[0].doko,
      imageAnalysis:jsonData,
      downloadURL:downloadURL,
      comment:comment,
      toukousya:this.InfoData[0].name,
      siten:this.InfoData[0].siten,
      busyo:this.InfoData[0].busyo,
      claimkey:this.InfoData[0].claimkey,
      startAt: firebase.database.ServerValue.TIMESTAMP
    };
    this.imageInfo=this.af.database.list('FileData/'+this.uid)
    //this.imageInfo=this.af.database.list('FileData/'+this.uid+'/'+this.InfoData[0].key)
    return  this.imageInfo.push(imageInfo)

  }


  fileAddTrigger(uid){
    let commentsRef = firebase.database().ref('FileData/'+uid);
    commentsRef.on('child_added', (value)=> {
    //  console.log("imagefile追加"+value.val())
      this.fileList.push({claimkey:value.val().claimkey,key:value.key,imageAnalysis:value.val().imageAnalysis,downloadURL:value.val().downloadURL,
        comment:value.val().comment,toukousya:value.val().toukousya,siten:value.val().siten,busyo:value.val().busyo,doko:value.val().doko,
        startAt:value.val().startAt})
    })
  }

  fileChangeTrigger(uid){
    let commentsRef = firebase.database().ref('FileData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.fileList){
        if(this.fileList[index].key==value.key){

          this.fileList[index]={claimkey:value.val().claimkey,key:value.key,imageAnalysis:value.val().imageAnalysis,downloadURL:value.val().downloadURL,
            comment:value.val().comment,toukousya:value.val().toukousya,siten:value.val().siten,busyo:value.val().busyo,doko:value.val().doko,
            startAt:value.val().startAt}
        }
      }
    })
  }
  fileRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('FileData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.fileList){
        if(this.fileList[key].key==value.key){
          this.fileList.splice(Number(key),1);
        }
      }
    })
  }




  taiouAddTrigger(uid){
    let commentsRef = firebase.database().ref('TaiouData/'+uid);
    commentsRef.on('child_added', (value)=> {
   // console.log("taiou追加"+value.val().claimkey)
       this.taiouList.push({claimkey:value.val().claimkey,key:value.key,syubetu:value.val().syubetu,name:value.val().name,
         siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
         password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt})
    })
  }
  taiouChangeTrigger(uid){
    let commentsRef = firebase.database().ref('TaiouData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
       for(let index in this.taiouList){
        if(this.taiouList[index].key==value.key){
          this._observerTaiou.next(this.taiouList);
           this.taiouList[index]={claimkey:value.val().claimkey,key:value.key,syubetu:value.val().syubetu,name:value.val().name,
             siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
             password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt}
         }
       }
    })
  }
  taiouRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('TaiouData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
       for(let key in this.taiouList){
        if(this.taiouList[key].key==value.key){
          this.taiouList.splice(Number(key),1);
        }
      }
    })
  }

  taisakuAddTrigger(uid){
    let commentsRef = firebase.database().ref('TaisakuData/'+uid);
    commentsRef.on('child_added', (value)=> {
      //   console.log("taiou追加"+value.val().name)

      this.taisakuList.push({claimkey:value.val().claimkey,key:value.key,syubetu:value.val().syubetu,name:value.val().name,
        siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
        password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt})
    })

  }
  taisakuChangeTrigger(uid){
    let commentsRef = firebase.database().ref('TaisakuData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.taisakuList){
        if(this.taisakuList[index].key==value.key){
          this._observerTaisaku.next(this.taisakuList);
          this.taisakuList[index]={claimkey:value.val().claimkey,key:value.key,syubetu:value.val().syubetu,name:value.val().name,
            siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
            password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt}
        }
      }
    })



  }
  taisakuRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('TaisakuData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.taisakuList){
        if(this.taisakuList[key].key==value.key){
          this.taisakuList.splice(Number(key),1);
        }
      }
    })
  }

  geninAddTrigger(uid){
    let commentsRef = firebase.database().ref('GeninData/'+uid);
    commentsRef.on('child_added', (value)=> {
      //   console.log("taiou追加"+value.val().name)
      this.geninList.push({claimkey:value.val().claimkey,key:value.key,name:value.val().name,
        siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
        password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt})
    })
  }
  geninChangeTrigger(uid){
    let commentsRef = firebase.database().ref('GeninData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.geninList){
        if(this.geninList[index].key==value.key){
          this._observerGenin.next(this.geninList);
          this.geninList[index]={claimkey:value.val().claimkey,key:value.key,name:value.val().name,
            siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
            password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt}
        }
      }
    })
  }
  geninRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('GeninData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.geninList){
        if(this.geninList[key].key==value.key){
          this.geninList.splice(Number(key),1);
        }
      }
    })
  }


  koukaAddTrigger(uid){
    let commentsRef = firebase.database().ref('KoukaData/'+uid);
    commentsRef.on('child_added', (value)=> {
      //   console.log("taiou追加"+value.val().name)
      this.koukaList.push({claimkey:value.val().claimkey,key:value.key,name:value.val().name,
        siten:value.val().siten,busyo:value.val().busyo,aa:value.val().aa,bb:value.val().bb,cc:value.val().cc,dd:value.val().dd,naiyou:value.val().naiyou,koukai:value.val().koukai,
        password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt})
    })
  }
  koukaChangeTrigger(uid){
    let commentsRef = firebase.database().ref('KoukaData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.koukaList){
        if(this.koukaList[index].key==value.key){
          this._observerKouka.next(this.koukaList);
          this.koukaList[index]={claimkey:value.val().claimkey,key:value.key,name:value.val().name,
            siten:value.val().siten,busyo:value.val().busyo,aa:value.val().aa,bb:value.val().bb,
            cc:value.val().cc,dd:value.val().dd,naiyou:value.val().naiyou,koukai:value.val().koukai,
            password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt}
        }
      }
    })
  }
  koukaRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('KoukaData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.koukaList){
        if(this.koukaList[key].key==value.key){
          this.koukaList.splice(Number(key),1);
        }
      }
    })
  }

  commentAddTrigger(uid){
    let commentsRef = firebase.database().ref('CommentData/'+uid);
    commentsRef.on('child_added', (value)=> {
      //   console.log("taiou追加"+value.val().name)

      this.commentList.push({claimkey:value.val().claimkey,key:value.key,name:value.val().name,
        siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
        password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt})
    })
  }
  commentChangeTrigger(uid){
    let commentsRef = firebase.database().ref('CommentData/'+uid);
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.commentList){
        if(this.commentList[index].key==value.key){
          this._observerComment.next(this.commentList);
          this.commentList[index]={claimkey:value.val().claimkey,key:value.key,name:value.val().name,
            siten:value.val().siten,busyo:value.val().busyo,naiyou:value.val().naiyou,koukai:value.val().koukai,
            password:value.val().password,startAt:value.val().startAt,updateAt:value.val().updateAt}
        }
      }
    })
  }
  commentRemoveTrigger(uid){
    let commentsRef = firebase.database().ref('CommentData/'+uid);
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.commentList){
        if(this.commentList[key].key==value.key){
          this.commentList.splice(Number(key),1);
        }
      }
    })
  }


















  syubetuAdd(uid){
  let commentsRef = firebase.database().ref('selectData/'+uid+'/syubetuInfo');
  commentsRef.on('child_added', (value)=> {
   //console.log(value.key)
    //console.log(value.val().syubetuInfo)
  this.syubetuList.push({key:value.key,syubetu:value.val().syubetuInfo,tourokusya:value.val().tourokusya})
    //  this.claimList.push({key:value.key,busyo:value.val().busyo,tourokusya:value.val().tourokusya,startAt:value.val().startAt})
  })
}
  syubetuChange(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/syubetuInfo');
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.syubetuList){
        if(this.syubetuList[index].key==value.key){
         // this._observerComment.next(this.commentList);
          this.syubetuList[index]={key:value.key,syubetu:value.val().syubetuInfo,tourokusya:value.val().tourokusya
            }
        }
      }
    })
  }
  syubetuRemove(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/syubetuInfo');
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.syubetuList){
        if(this.syubetuList[key].key==value.key){
          this.syubetuList.splice(Number(key),1);
        }
      }
    })
  }



  taiouJyoukyouAdd(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taiouInfo');
    commentsRef.on('child_added', (value)=> {
      // console.log(value.key)
     // console.log(value.val())
      this.taiouSyubetuList.push({key:value.key,taiou:value.val().taiouInfo,tourokusya:value.val().tourokusya})
    })
  }
  taiouJyoukyouChange(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taiouInfo');
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.taiouSyubetuList){
        if(this.taiouSyubetuList[index].key==value.key){
          // this._observerComment.next(this.commentList);
          this.taiouSyubetuList[index]={key:value.key,taiou:value.val().taiouInfo,tourokusya:value.val().tourokusya
          }
        }
      }
    })
  }
  taiouJyoukyouRemove(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taiouInfo');
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.taiouSyubetuList){
        if(this.taiouSyubetuList[key].key==value.key){
          this.taiouSyubetuList.splice(Number(key),1);
        }
      }
    })
  }



  taisakuJyoukyouAdd(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taisakuInfo');
    commentsRef.on('child_added', (value)=> {
      // console.log(value.key)
     //  console.log(value.val())
      this.taisakuSyubetuList.push({key:value.key,taisaku:value.val().taisakuInfo,tourokusya:value.val().tourokusya})
    })
  }
  taisakuJyoukyouChange(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taisakuInfo');
    commentsRef.on('child_changed', (value)=> {
      // console.log("claim変更"+value.val().busyo)
      for(let index in this.taisakuSyubetuList){
        if(this.taisakuSyubetuList[index].key==value.key){
          // this._observerComment.next(this.commentList);
          this.taisakuSyubetuList[index]={key:value.key,taisaku:value.val().taisakuInfo,tourokusya:value.val().tourokusya
          }
        }
      }
    })
  }


  taisakuJyoukyouRemove(uid){
    let commentsRef = firebase.database().ref('selectData/'+uid+'/taisakuInfo');
    commentsRef.on('child_removed', (value)=> {
      //  console.log("claim削除"+value)
      for(let key in this.taisakuSyubetuList){
        if(this.taisakuSyubetuList[key].key==value.key){
          this.taisakuSyubetuList.splice(Number(key),1);
        }
      }
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
    this.sitens=this.af.database.list('companyData/'+uid+'/SitenInfo')
    return this.sitens.push(siten)


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
    this.members=this.af.database.list('companyData/'+uid+'/MemberInfo')
    return this.members.push(member)


  }
  deleteMember(key:string,uid:string){
    this.members=this.af.database.list('companyData/'+this.uid+'/MemberInfo')
    this.members.remove(key)
      .then(data=>{

      })
      .catch(error=>{


      });
  }


  // deleteTaiou(key:string,uid:string){
  //   this.taious=this.af.database.list('TaiouData/'+this.uid)
  //   this.taious.remove(key)
  //     .then(data=>{
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  // deleteTaisaku(key:string,uid:string){
  //   this.taisakus=this.af.database.list('TaisakuData/'+this.uid)
  //   this.taisakus.remove(key)
  //     .then(data=>{
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  // deleteGenin(key:string,uid:string){
  //   this.genins=this.af.database.list('GeninData/'+this.uid)
  //   this.genins.remove(key)
  //     .then(data=>{
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }

  // deleteKouka(key:string,uid:string){
  //   this.koukas=this.af.database.list('KoukaData/'+this.uid)
  //   this.koukas.remove(key)
  //     .then(data=>{
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }


  // deleteComment(key:string,uid:string){
  //   this.comments=this.af.database.list('CommentData/'+this.uid)
  //   this.comments.remove(key)
  //     .then(data=>{
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
























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
