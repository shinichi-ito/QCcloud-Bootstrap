import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";
import {InsideService} from "../../../Inside.service";

@Component({
  selector: 'app-taisaku-delete-dialog',
  templateUrl: './taisaku-delete-dialog.component.html',
  styleUrls: ['./taisaku-delete-dialog.component.css']
})
export class TaisakuDeleteDialogComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() taisakuData;//親コンポーネントから受取る属性
  pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  info: FirebaseListObservable<any[]>;
  taisakus: FirebaseListObservable<any[]>;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService,private af : AngularFire,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    if(this.taisakuData.password==this.pass){
      this.insideMainService.taisakukey=this.taisakuData.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
      // console.log(this.taiouData.key)
      //  console.log(this.taiouData.uid)
      this.deleteTaisaku(this.taisakuData.key,this.uid)
      this.modalRef.hide()
    }else{
      this.OnOff=true;

    }




  }

  deleteTaisaku(key:string,uid:string){
    this.taisakus=this.af.database.list('TaisakuData/'+this.uid)
    this.taisakus.remove(key)
      .then(data=>{

        this.minusTaisakuSu()

      })
      .catch(error=>{


      });
  }
  minusTaisakuSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
     //   console.log(this.claimList[key].taiou)

        let su:number;
        su=this.claimList[key].taisaku-1
        if(su<0){
          su=0;
        }
        const claimInfo = {
          taisaku:su,
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
