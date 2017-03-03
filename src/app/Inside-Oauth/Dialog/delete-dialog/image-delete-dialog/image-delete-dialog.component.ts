import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {InsideMainService} from "../../../inside-main.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase'
@Component({
  selector: 'app-image-delete-dialog',
  templateUrl: './image-delete-dialog.component.html',
  styleUrls: ['./image-delete-dialog.component.css']
})
export class ImageDeleteDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() password;//親コンポーネントから受取る属性
  pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;

  constructor(private insideMainService:InsideMainService,private af : AngularFire,private insideService:InsideService) {

  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    if(this.password.password==this.pass){
      this.insideMainService.jyoukyoukey=this.password.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
      let storage = firebase.storage();
      let storageRef = storage.ref();
      let desertRef = storageRef.child('FileData/'+this.password.uid+'/'+this.password.filename);
      desertRef.delete().then(()=> {

        this.Delete(this.password.key,this.password.uid)


      }).catch((error)=> {

      });




    }else{
      this.OnOff=true;

    }




  }

  Delete(key:string,uid:string){
    this.info=this.af.database.list('FileData/'+uid)
    this.info.remove(key)
      .then(data=>{
        this.minusImageSu(this.password.uid)

      })
      .catch(error=>{


      });
  }

  minusImageSu(uid:string){//クレーム情報の対応数をマイナス
    this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        //  console.log(this.claimList[key].file)

        let su:number;
        su=this.claimList[key].file-1;
        if(su<0){
          su=0;
        }
        const claimInfo = {
          file:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{
          this.modalRef.hide()
        }).catch(error=>{

        })
      }
    }
  }

}
