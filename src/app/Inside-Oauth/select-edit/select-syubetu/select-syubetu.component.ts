import {Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {ModalDirective} from "ng2-bootstrap";
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";
import {InsideService} from "../../Inside.service";



@Component({
  selector: 'app-select-syubetu',
  templateUrl: './select-syubetu.component.html',
  styleUrls: ['./select-syubetu.component.css']
})
export class SelectSyubetuComponent implements OnInit {
  index:number;
  syubetuData;
  tourokusya:string;
  syubetu:string;
  syubetuname:string='';
  tourokusyaname:string='';
  uid:string;
  busyoList:any[]=[];
  value: FirebaseObjectObservable<any>;
  syubetus:any[]=[];
  taiouSyubetuList:any[]=[];
  taisakuSyubetuList:any[]=[];
  syubetukey:string;
  info: FirebaseListObservable<any[]>;
  @ViewChild("lgModal") modalRef:ModalDirective;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService,
              private insideService:InsideService,private af : AngularFire) {
    this.syubetus=this.insideService.syubetuList;
    this.taiouSyubetuList=this.insideService.taiouSyubetuList;
    this.taisakuSyubetuList=this.insideService.taisakuSyubetuList;
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }
  setEdit(index){
    this.index=index
    this.syubetuData=this.syubetus[index];
    this.syubetukey=this.syubetuData.key
    this.syubetuname=this.syubetuData.syubetu
    this.tourokusyaname=this.syubetuData.tourokusya
    //console.log( this.syubetukey)
    //  console.log( this.syubetuname)
    this.modalRef.show()
  }
  onEdit(){
    const Info = {
      syubetuInfo:this.syubetuname,
      tourokusya:this.tourokusyaname
    };
    this.value = this.af.database.object('selectData/' + this.uid + '/syubetuInfo/'+this.syubetukey);
    this.value.update(Info).then(data=>{

      this.syubetus=this.insideService.syubetuList;


      this.modalRef.hide()
    }).catch(error=>{
    })
  }
  Delete(index){
    this.index=index
    this.syubetuData=this.syubetus[index];
    this.deleteSyubetu(this.syubetuData.key,this.uid)
  }

  deleteSyubetu(key:string,uid:string){
    this.info=this.af.database.list('selectData/' + uid + '/syubetuInfo')
    this.info.remove(key)
      .then(data=>{
        this.syubetus=this.insideService.syubetuList;
      })
      .catch(error=>{


      });
  }

  addSyubetu(){

    this.insideMainService.addSelect(this.uid,this.syubetuname,this.tourokusyaname).then(data=>{

    }).catch(error=>{

    })
  }



}
