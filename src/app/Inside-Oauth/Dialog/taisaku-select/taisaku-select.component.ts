import {Component, OnInit, ViewChild} from '@angular/core';
import {InsideMainService} from "../../inside-main.service";
import {OauthInfoService} from "../../oauth-info.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-taisaku-select',
  templateUrl: './taisaku-select.component.html',
  styleUrls: ['./taisaku-select.component.css']
})
export class TaisakuSelectComponent implements OnInit {
  @ViewChild("lgModal") modalRef:ModalDirective;//Modalダイアログへの参照
  uid:string;
  naiyou:string='';
  name:string='';
  nameB:boolean;
  naiyouB:boolean;
  constructor(private insideMainService:InsideMainService,private oauthInfoService:OauthInfoService) {
    this.uid=this.oauthInfoService.uid;
  }

  ngOnInit() {
  }

  openDialog() {
    this.modalRef.show();
  }

  onAdd(){

    if(this.naiyou==='') {
      this.naiyouB = true;
      return
    }else{
      this.naiyouB = false;
      if(this.name==='') {
        this.nameB = true;
        return
      }else{
        this.nameB = false;
        this.insideMainService.addTaisakuSelect(this.uid,this.naiyou,this.name).then(data=>{
          this.name='';
          this.naiyou='';
          this.modalRef.hide()
        }).catch(error=>{

        })

      }

    }





  }
}
