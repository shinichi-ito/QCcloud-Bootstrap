import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {ModalDirective} from "ng2-bootstrap";
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-select-taisaku',
  templateUrl: './select-taisaku.component.html',
  styleUrls: ['./select-taisaku.component.css']
})
export class SelectTaisakuComponent implements OnInit {
  index:number;
  syubetuData;
  tourokusya:string;
  syubetu:string;
  syubetuname:string='';
  tourokusyaname:string='';
  uid:string;
  busyoList:any[]=[];
  value: FirebaseObjectObservable<any>;
//  syubetus:any[]=[];
  taisakuSyubetuList:any[]=[];
//  taisakuSyubetuList:any[]=[];
  syubetukey:string;
  info: FirebaseListObservable<any[]>;
  @ViewChild("lgModal") modalRef:ModalDirective;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService,
              private insideService:InsideService,private af : AngularFire) {

    this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
console.log(this.taisakuSyubetuList)
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  setEdit(index){
    this.index=index
    this.syubetuData=this.taisakuSyubetuList[index];
    this.syubetukey=this.syubetuData.key
    this.syubetuname=this.syubetuData.taisaku
    this.tourokusyaname=this.syubetuData.tourokusya
    //console.log( this.syubetukey)
    //  console.log( this.syubetuname)
    this.modalRef.show()
  }
  onEdit(){
    const Info = {
      taisakuInfo:this.syubetuname,
      tourokusya:this.tourokusyaname
    };
    this.value = this.af.database.object('selectData/' + this.uid + '/taisakuInfo/'+this.syubetukey);
    this.value.update(Info).then(data=>{

      this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;


      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index
    this.syubetuData=this.taisakuSyubetuList[index];
    this.deleteSyubetu(this.syubetuData.key,this.uid)
  }

  deleteSyubetu(key:string,uid:string){
    this.info=this.af.database.list('selectData/' + uid + '/taisakuInfo')
    this.info.remove(key)
      .then(data=>{
        this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
      })
      .catch(error=>{


      });
  }

  addSyubetu(){

    this.insideMainService.addTaisakuSelect(this.uid,this.syubetuname,this.tourokusyaname).then(data=>{

    }).catch(error=>{

    })
  }


}
