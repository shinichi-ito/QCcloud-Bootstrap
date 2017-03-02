import {Component, OnInit, Input, Inject, ViewChild} from '@angular/core';
import {OauthInfoService} from "../../oauth-info.service";
import * as firebase from 'firebase'
import {InsideService} from "../../Inside.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {PasswordDialogComponent} from "../../Dialog/password-dialog/password-dialog.component";
@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {
  @ViewChild("passwordDialog") passwordDialogComponent: PasswordDialogComponent;

@Input() jyoukyouData;
  @Input() passwordData;
password:any[]=[];
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  uid:string;
  constructor(private af : AngularFire,private insideService:InsideService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid
  }

  ngOnInit() {

  }

  setPassword(){
   // hashColor2['red'] = "赤";
    this.password['filename']=this.jyoukyouData[0].filename;
    this.password['uid']=this.uid;
    this.password['password']=this.passwordData[0];
 //  console.log(this.passwordData[0])
  //  console.log(this.passwordData[0].password)
   this.passwordDialogComponent.openDialog();
  }


delete(){
   let storage = firebase.storage();
  let storageRef = storage.ref();
  let desertRef = storageRef.child('FileData/'+this.uid+'/'+this.jyoukyouData[0].filename);
  desertRef.delete().then(()=> {
    this.minusImageSu()
    // File deleted successfully
  }).catch((error)=> {
    // Uh-oh, an error occurred!
  });

}

  minusImageSu(){//クレーム情報の対応数をマイナス
    this.claimitem=this.insideService.claimitem;
    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        console.log(this.claimList[key].file)

        let su:number;
        su=this.claimList[key].file-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          file:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key)
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }


}
