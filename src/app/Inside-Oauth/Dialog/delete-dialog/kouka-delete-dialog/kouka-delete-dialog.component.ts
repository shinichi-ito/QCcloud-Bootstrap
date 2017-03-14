import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {OauthInfoService} from "../../../oauth-info.service";
import {InsideMainService} from "../../../inside-main.service";
import {InsideService} from "../../../Inside.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-kouka-delete-dialog',
  templateUrl: './kouka-delete-dialog.component.html',
  styleUrls: ['./kouka-delete-dialog.component.css']
})
export class KoukaDeleteDialogComponent implements OnInit {

  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  @Input() koukaData;//親コンポーネントから受取る属性
  pass:string;
  uid:string;
  OnOff:boolean=false;
  claimList:any[]=[];
  claimitem:any;
  claimInfo: FirebaseObjectObservable<any[]>;
  taisakuInfo: FirebaseObjectObservable<any[]>;
  taisakuList:any;
  info: FirebaseListObservable<any[]>;
  koukas: FirebaseListObservable<any[]>;
  koukaFromTaisakudata:any;
  constructor(private oauthInfoService:OauthInfoService,private insideMainService:InsideMainService,
              private af : AngularFire,private insideService:InsideService) {
    this.uid=this.oauthInfoService.uid;
    this.claimitem=this.insideService.claimitem;
    this.koukaFromTaisakudata= this.insideMainService.koukaFromTaisakudata;
  }

  ngOnInit() {

  }
  openDialog() {
    this.modalRef.show();
  }

  delete(){
    if(this.koukaData.password==this.pass){
      this.insideMainService.koukakey=this.koukaData.key;//削除するFileDataのキーを別に保管して　画像一覧の表示をオぶサーバ使って削除
      // console.log(this.taiouData.key)
      //  console.log(this.taiouData.uid)
      this.deleteKouka(this.koukaData.key,this.uid)
      this.modalRef.hide()
    }else{
      this.OnOff=true;

    }




  }

  deleteKouka(key:string,uid:string){
    this.koukas=this.af.database.list('KoukaData/'+this.uid)
    this.koukas.remove(key)
      .then(data=>{

        this.minusKoukaSu();
        this.mainusTaisakusu()
      })
      .catch(error=>{


      });
  }
  minusKoukaSu(){//クレーム情報の対応数をマイナス

    this.claimList=this.insideService.claimList
    for(let key in this.claimList) {
      if (this.claimList[key].key == this.claimitem.key) {
       // console.log(this.claimList[key].taiou)

        let su:number;
        su=this.claimList[key].kouka-1;
        if(su<0){
          su=0;
        }
        const claimInfo = {
          kouka:su,
          updateAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.claimInfo=this.af.database.object('ClaimData/'+this.uid+'/'+this.claimitem.key);
        this.claimInfo.update(claimInfo).then(data=>{

        }).catch(error=>{

        })
      }
    }
  }
  mainusTaisakusu(){//効果をインプットしたとき対策内のkoukasuに件数を入れる。あとでその対策で効果が入っているかチェックするため
    this.taisakuList=this.insideService.taisakuList;
    // console.log(this.koukaFromTaisakudata.key)

    for(let key in this.taisakuList) {

     //  console.log(this.taisakuList[key].koukasu);
      if (this.taisakuList[key].key == this.koukaFromTaisakudata.key) {
        let su:number;
        su=this.taisakuList[key].koukasu-1;
        if(su<0){
          su=0;
        }
//console.log(su)

         const Info = {
          koukasu:su,
           koukaUp: firebase.database.ServerValue.TIMESTAMP
         };
       // console.log('ここ')
          this.taisakuInfo=this.af.database.object('TaisakuData/'+this.uid+'/'+this.koukaFromTaisakudata.key);
          this.taisakuInfo.update(Info).then(data=>{
         }).catch(error=>{
         })

      }

    }

  }

}
