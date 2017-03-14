import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../../inside-main.service";
import {InsideService} from "../../../Inside.service";
import {OauthInfoService} from "../../../oauth-info.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-taiou-delete-dialog',
  templateUrl: './taiou-delete-dialog.component.html',
  styleUrls: ['./taiou-delete-dialog.component.css']
})
export class TaiouDeleteDialogComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taiouData;//親コンポーネントから受取る属性
  pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;
  taious: FirebaseListObservable<any[]>;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService,private af : AngularFire,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    if(this.taiouData.password==this.pass){
      this.insideMainService.taioukey=this.taiouData.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
     // console.log(this.taiouData.key)
    //  console.log(this.taiouData.uid)
     this.deleteTaiou(this.taiouData.key,this.uid)
     this.modalRef.hide()
    }else{
      this.OnOff=true;

    }




  }

  deleteTaiou(key:string,uid:string){
    this.taious=this.af.database.list('TaiouData/'+this.uid)
    this.taious.remove(key)
      .then(data=>{

        this.minusTaiouSu()

      })
      .catch(error=>{


      });
  }
  minusTaiouSu(){//クレーム情報の対応数をマイナス
//console.log('ここ')
  //  console.log(this.claimitem)
    this.claimList=this.insideService.claimList
 //   console.log(this.claimList)
     for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        let su:number;
        su=this.claimList[key].taiou-1
            if(su<0){
              su=0;}

         const claimInfo = {
           taiou:su,
          taiouUp: firebase.database.ServerValue.TIMESTAMP
         };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data=>{

         }).catch(error=>{

         })


     }
   }





    // this.claimList=this.insideService.claimList
    // let su:number;
    // for(let key in this.claimList) {
    //   if (this.claimList[key].key == this.claimitem.key) {
    //     console.log(this.claimList[key].taiou)
    //
    //
    //     su=this.claimList[key].taiou-1
    //     if(su<0){
    //       su=0;
    //     }
    //
    //   }
    // }
    //
    // const claimInfo = {
    //   taiou:su,
    //   updateAt: firebase.database.ServerValue.TIMESTAMP
    // };
    // this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
    // this.claimInfo.update(claimInfo).then(data=>{
    //
    // }).catch(error=>{
    //
    // })
    //

  }








  // Delete(key:string,uid:string){
  //   this.info=this.af.database.list('FileData/'+uid)
  //   this.info.remove(key)
  //     .then(data=>{
  //       this.minusImageSu(this.password.uid)
  //
  //     })
  //     .catch(error=>{
  //
  //
  //     });
  // }
  //
  // minusImageSu(uid:string){//クレーム情報の対応数をマイナス
  //   this.claimitem=this.insideService.claimitem;
  //   this.claimList=this.insideService.claimList
  //   for(let key in this.claimList) {
  //     if (this.claimList[key].key == this.claimitem.key) {
  //       //  console.log(this.claimList[key].file)
  //
  //       let su:number;
  //       su=this.claimList[key].file-1;
  //       if(su<0){
  //         su=0;
  //       }
  //       const claimInfo = {
  //         file:su,
  //         updateAt: firebase.database.ServerValue.TIMESTAMP
  //       };
  //       this.claimInfo=this.af.database.object('ClaimData/'+uid+'/'+this.claimitem.key)
  //       this.claimInfo.update(claimInfo).then(data=>{
  //         this.modalRef.hide()
  //       }).catch(error=>{
  //
  //       })
  //     }
  //   }
  // }

}
