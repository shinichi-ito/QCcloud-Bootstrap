import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {ModalDirective} from "ng2-bootstrap";
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";
import {InsideService} from "../../Inside.service";

@Component({
  selector: 'app-select-taiou',
  templateUrl: './select-taiou.component.html',
  styleUrls: ['./select-taiou.component.css']
})
export class SelectTaiouComponent implements OnInit {

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
  taiouSyubetuList:any[]=[];
//  taisakuSyubetuList:any[]=[];
  syubetukey:string;
  info: FirebaseListObservable<any[]>;
  @ViewChild("lgModal") modalRef:ModalDirective;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService,
              private insideService:InsideService,private af : AngularFire) {
  //  this.syubetus=this.insideService.syubetuList;
    this.taiouSyubetuList=this.insideService.taiouSyubetuList;
  //  this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  setEdit(index){
    this.index=index
    this.syubetuData=this.taiouSyubetuList[index];
    this.syubetukey=this.syubetuData.key
    this.syubetuname=this.syubetuData.taiou
    this.tourokusyaname=this.syubetuData.tourokusya
    //console.log( this.syubetukey)
    //  console.log( this.syubetuname)
    this.modalRef.show()
  }
  onEdit(){
    const Info = {
      taiouInfo:this.syubetuname,
      tourokusya:this.tourokusyaname
    };
    this.value = this.af.database.object('selectData/' + this.uid + '/taiouInfo/'+this.syubetukey);
    this.value.update(Info).then(data=>{

      this.taiouSyubetuList=this.insideService.taiouSyubetuList;


      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index
    this.syubetuData=this.taiouSyubetuList[index];
    this.deleteSyubetu(this.syubetuData.key,this.uid)
  }

  deleteSyubetu(key:string,uid:string){
    this.info=this.af.database.list('selectData/' + uid + '/taiouInfo')
    this.info.remove(key)
      .then(data=>{
        this.taiouSyubetuList=this.insideService.taiouSyubetuList;
      })
      .catch(error=>{


      });
  }

  addSyubetu(){

    this.insideMainService.addTaiouSelect(this.uid,this.syubetuname,this.tourokusyaname).then(data=>{

    }).catch(error=>{

    })
  }



}
