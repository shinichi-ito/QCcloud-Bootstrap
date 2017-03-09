import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-genin-delete-dialog',
  templateUrl: './genin-delete-dialog.component.html',
  styleUrls: ['./genin-delete-dialog.component.css']
})
export class GeninDeleteDialogComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() geninData;//親コンポーネントから受取る属性
  pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;
  genins: FirebaseListObservable<any[]>;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService,
              private af : AngularFire,private insideService:InsideService) {
    this.claimitem=this.insideService.claimitem;
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    if(this.geninData.password==this.pass){
      this.insideMainService.geninkey=this.geninData.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
      // console.log(this.taiouData.key)
      //  console.log(this.taiouData.uid)
      this.deleteGenin(this.geninData.key,this.uid)
      this.modalRef.hide()
    }else{
      this.OnOff=true;

    }




  }

  deleteGenin(key:string,uid:string){
    this.genins=this.af.database.list('GeninData/'+this.uid)
    this.genins.remove(key)
      .then(data=>{

        this.minusGeninSu()

      })
      .catch(error=>{


      });
  }
  minusGeninSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
        // console.log(this.claimList[key].taiou)

        let su:number;
        su=this.claimList[key].genin-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          genin:su,
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
